import axios from 'axios';
import { history } from '../utils/history';

const ERROR = 'ERROR';
const SAVING = 'SAVING';
const LOADING = 'LOADING';
const SUCCESS = 'SUCCESS';
const SUCCESS_TRANSACTIONS = 'SUCCESS_TRANSACTIONS';
const FINISHED = 'FINISHED';

export function saveTransaction(result) {
  return async function (dispatch) {
    dispatch({ type: SAVING });
    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/transactions/create',
        data: {
          ong: result.x_extra1,
          email: result.x_extra2,
          refPago: result.x_ref_payco,
          date: result.x_fecha_transaccion,
          amount: result.x_amount,
          status: result.x_transaction_state,
        },
      });
      dispatch({ type: SUCCESS, payload: data.transaction });
    } catch (error) {
      if (!!error.response) {
        dispatch({ type: ERROR, payload: error.response.data.message });
      } else {
        dispatch({ type: ERROR, payload: 'Error para cargar el resultado.' });
      }
    } finally {
      dispatch({ type: FINISHED });
    }
  };
}

export function getTransactions(params) {
  return async function (dispatch) {
    dispatch({ type: LOADING });
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/transactions/get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: params,
      });
      dispatch({ type: SUCCESS_TRANSACTIONS, payload: data.transactions });
    } catch (error) {
      dispatch({ type: ERROR, payload: error.response.data.message });
      if (
        error.response !== undefined &&
        error.response.request.status === 401
      ) {
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
  saving: false,
  loading: false,
  transaction: {},
  transactions: [],
  error: null,
};

export function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case SAVING:
      return {
        ...state,
        saving: true,
        error: null,
      };
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
    case SUCCESS:
      return {
        ...state,
        transaction: action.payload,
      };
    case SUCCESS_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    case FINISHED:
      return {
        ...state,
        saving: false,
        loading: false,
      };
    default:
      return state;
  }
}
