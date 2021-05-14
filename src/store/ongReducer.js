import axios from 'axios';
import { history } from '../utils/history';

const LOADING = 'LOADING';
const ERROR = 'ERROR';
export const ONG_LOADED = 'ONG_LOADED';
export const ONG_CHANGING = 'ONG_CHANGING';
const FINISHED = 'FINISHED';

export function getOng() {
  return async function (dispatch) {
    dispatch({ type: LOADING });
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/ong',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: ONG_LOADED, payload: data.ong });
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
      if (!!error.response && error.response.request.status === 401) {
        localStorage.removeItem('token');
        alert('Su sesión expiró, ingrese nuevamente.');
        history.push('/entrar');
      }
    } finally {
      dispatch({ type: FINISHED });
    }
  };
}

export function getPublicOng(ongId) {
  return async function (dispatch) {
    dispatch({ type: LOADING });
    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/ong/${ongId}`,
      });
      dispatch({ type: ONG_LOADED, payload: data.ong });
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    } finally {
      dispatch({ type: FINISHED });
    }
  };
}

const initialState = {
  ong: {},
  loading: false,
  error: null,
};

export function ongReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ONG_LOADED:
      return {
        ...state,
        ong: action.payload,
      };
    case ONG_CHANGING:
      return {
        ...state,
        ong: {},
      };
    case FINISHED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
