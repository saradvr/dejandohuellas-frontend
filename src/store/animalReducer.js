import axios from 'axios';
import { history } from '../utils/history';
import { ONG_LOADED } from './ongReducer';

const SAVING = 'SAVING';
const LOADING = 'LOADING';
const FINISHED = 'FINISHED';
const ERROR = 'ERROR';
const SUCCESS_ANIMAL = 'SUCCESS_ANIMAL';
const SUCCESS_ANIMALS = 'SUCCESS_ANIMALS';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export function createAnimal(form) {
  return async function (dispatch) {
    dispatch({ type: SAVING });
    dispatch({ type: ERROR, payload: '' });
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/animals/new',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        data: form,
      });
      dispatch({ type: SUCCESS_ANIMAL, payload: data.animal });
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

export function updateAnimal(form, animalId) {
  return async function (dispatch) {
    dispatch({ type: SAVING });
    dispatch({ type: ERROR, payload: '' });
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/animals/${animalId}/update`,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        data: form,
      });
      dispatch({ type: SUCCESS_ANIMAL, payload: data.animal });
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

export function getAnimal(animalId) {
  return async function (dispatch) {
    dispatch({ type: SAVING });
    dispatch({ type: ERROR, payload: '' });
    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/animals/${animalId}`,
      });
      dispatch({ type: SUCCESS_ANIMAL, payload: data.animal });
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

const initialState = {
  loading: false,
  saving: false,
  animals: [],
  animal: {},
  showModal: false,
};

export function animalReducer(state = initialState, action) {
  switch (action.type) {
    case SAVING:
      return {
        ...state,
        saving: true,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS_ANIMALS:
      return {
        ...state,
        animals: action.payload,
      };
    case SUCCESS_ANIMAL:
      return {
        ...state,
        animal: action.payload,
      };
    case FINISHED:
      return {
        ...state,
        loading: false,
        saving: false,
      };
    case SHOW_MODAL:
      return {
        ...state,
        showModal: true,
      };
    case HIDE_MODAL:
      return {
        ...state,
        showModal: false,
      };
    default:
      return state;
  }
}
