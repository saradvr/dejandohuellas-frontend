import axios from 'axios';
import { history } from '../utils/history';
import { getPerson } from './personReducer';

const SAVING_REQUEST = 'SAVING_REQUEST';
const LOADING_REQUEST = 'LOADING_REQUEST';
const ERROR_REQUEST = 'ERROR_REQUEST';
const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const REQUESTS_SUCCESS = 'REQUESTS_SUCCESS';
const FINISHED_REQUEST = 'FINISHED_REQUEST';

export function createRequest(animalId, ongId, message, cb) {
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
          status: 'Nueva',
        },
      });
      dispatch({ type: REQUEST_SUCCESS, payload: data.request });
      cb();
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

export function deleteRequest(requestId) {
  return async function (dispatch) {
    dispatch({ type: SAVING_REQUEST });
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios({
        method: 'DELETE',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/requests/delete',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          requestId,
        },
      });
      dispatch({ type: REQUEST_SUCCESS, payload: data.request });
      history.push('/requests');
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
          payload: 'Error para eliminar la solicitud.',
        });
      }
    } finally {
      dispatch({ type: FINISHED_REQUEST });
    }
  };
}

export function getRequest(requestId) {
  return async function (dispatch) {
    dispatch({ type: LOADING_REQUEST });
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/requests/${requestId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        }
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
          payload: 'Error para cargar la solicitud.',
        });
      }
    } finally {
      dispatch({ type: FINISHED_REQUEST });
    }
  };
}

export function updateRequest(status, _id) {
  return async function (dispatch) {
    dispatch({ type: SAVING_REQUEST });
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: 'requests/update',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          status,
          _id,
        },
      });
      dispatch({ type: REQUEST_SUCCESS, payload: data.request });
      dispatch(getPerson());
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
          payload: 'Error para guardar el cambio.',
        });
      }
    } finally {
      dispatch({ type: FINISHED_REQUEST });
    }
  };
}

export function getRequests() {
  return async function (dispatch) {
    dispatch({ type: LOADING_REQUEST });
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: 'requests/list',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: REQUESTS_SUCCESS, payload: data.requests });
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
          payload: 'Error para cargar las solicitudes.',
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
