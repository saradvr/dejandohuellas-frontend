import axios from 'axios';
import { history } from '../utils/history';

const SAVING_REQUEST = 'SAVING_REQUEST';
const LOADING_REQUEST = 'LOADING_REQUEST';
const ERROR_REQUEST = 'ERROR_REQUEST';
const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const REQUESTS_SUCCESS = 'REQUESTS_SUCCESS';
const FINISHED_REQUEST = 'FINISHED_REQUEST';

export function createRequest(animalId, ongId, message) {
  return async function (dispatch) {
    dispatch({ type: SAVING_REQUEST });
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/requests/create',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          animal: animalId,
          ong: ongId,
          message,
          status: 'Nuevo',
        },
      });
      dispatch({ type: REQUEST_SUCCESS, payload: data.request });
    } catch (error) {
      if (!!error.response) {
        dispatch({ type: ERROR_REQUEST, payload: error.response.data.message });
        if (error.response.request.status === 401) {
          localStorage.clear();
          alert('Su sesión expiró, ingrese nuevamente.');
          history.push('/entrar');
        }
      } else {
        dispatch({
          type: ERROR_REQUEST,
          payload: 'Error para cargar la información.',
        });
      }
    } finally {
      dispatch({ type: FINISHED_REQUEST });
    }
  };
}

const initialState = {
  error: null,
  saving: false,
  loading: false,
  request: {},
  requests: [],
};

export function adoptionReducer(state = initialState, action) {
  switch (action.type) {
    case SAVING_REQUEST:
      return {
        ...state,
        saving: true,
        error: null,
      };
    case LOADING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ERROR_REQUEST:
      return {
        ...state,
        error: action.payload,
      };
    case REQUESTS_SUCCESS:
      return {
        ...state,
        requests: action.payload,
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        request: action.payload,
      };
    case FINISHED_REQUEST:
      return {
        ...state,
        loading: false,
        saving: false,
      };
    default:
      return state;
  }
}
