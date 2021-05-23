import axios from 'axios';
import { history } from '../utils/history';

const LOADING_PERSON = 'LOADING_PERSON';
const SAVING_PERSON = 'SAVING_PERSON';
const ERROR_PERSON = 'ERROR_PERSON';
const FINISHED_PERSON = 'FINISHED_PERSON';
const SUCCESS_PERSON = 'SUCCESS_PERSON';

export function getPerson() {
  return async function (dispatch) {
    dispatch({ type: LOADING_PERSON });
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/person/get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: SUCCESS_PERSON, payload: data.person });
    } catch (error) {
      if (!!error.response) {
        dispatch({ type: ERROR_PERSON, payload: error.response.data.message });
        if (error.response.request.status === 401) {
          localStorage.clear();
          alert('Su sesión expiró, ingrese nuevamente.');
          history.push('/entrar');
        }
      } else {
        dispatch({
          type: ERROR_PERSON,
          payload: 'Error para cargar la información.',
        });
      }
    } finally {
      dispatch({ type: FINISHED_PERSON });
    }
  };
}

export function updatePerson(personInfo, cb) {
  return async function (dispatch) {
    dispatch({ type: SAVING_PERSON });
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/person/update',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: personInfo,
      });
      dispatch({ type: SUCCESS_PERSON, payload: data.person });
      cb();
    } catch (error) {
      if (!!error.response) {
        dispatch({ type: ERROR_PERSON, payload: error.response.data.message });
        if (error.response.request.status === 401) {
          localStorage.clear();
          alert('Su sesión expiró, ingrese nuevamente.');
          history.push('/entrar');
        }
      } else {
        dispatch({
          type: ERROR_PERSON,
          payload: 'Error para cargar la información.',
        });
      }
    } finally {
      dispatch({ type: FINISHED_PERSON });
    }
  };
}

const initialState = {
  error: null,
  saving: true,
  loading: true,
  person: {},
};

export function personReducer(state = initialState, action) {
  switch (action.type) {
    case SAVING_PERSON:
      return {
        ...state,
        saving: true,
        error: null,
      };
    case LOADING_PERSON:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SUCCESS_PERSON:
      return {
        ...state,
        person: action.payload,
      };
    case ERROR_PERSON:
      return {
        ...state,
        error: action.payload,
      };
    case FINISHED_PERSON:
      return {
        ...state,
        saving: false,
        loading: false,
      };
    default:
      return state;
  }
}
