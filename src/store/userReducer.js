import axios from 'axios';
import { history } from '../utils/history';
const LOADING = 'LOADING';
const DEFINE_USER = 'DEFINE_USER';
const USER_ERROR = 'USER_ERROR';
const USER_FINISHED = 'USER_FINISHED';

export function createUser(name, email, password, userType) {
  return async function (dispatch) {
    dispatch({ type: LOADING });
    dispatch({ type: USER_ERROR, payload: '' });
    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/users/register',
        data: {
          name,
          email,
          password,
          userType,
        },
      });
      dispatch({ type: DEFINE_USER, payload: data.user });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userType', userType);
      history.push('/adopta');
    } catch (error) {
      if (!!error && !!error.response.data.error.errors.email.message) {
        dispatch({
          type: USER_ERROR,
          payload: error.response.data.error.errors.email.message,
        });
      } else {
        dispatch({ type: USER_ERROR, payload: error.message });
      }
    } finally {
      dispatch({ type: USER_FINISHED });
    }
  };
}

export function login(email, password) {
  return async function (dispatch) {
    dispatch({ type: LOADING });
    dispatch({ type: USER_ERROR, payload: '' });
    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/users/login',
        data: {
          email,
          password,
        },
      });
      dispatch({ type: DEFINE_USER, payload: data.user });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userType', data.userType);
      history.push('/adopta');
    } catch (error) {
      dispatch({ type: USER_ERROR, payload: error.response.data.message });
    } finally {
      dispatch({ type: USER_FINISHED });
    }
  };
}

const initialState = {
  user: {},
  loading: false,
  error: null,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case DEFINE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case USER_FINISHED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
