import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { userReducer } from './userReducer';
import { animalReducer } from './animalReducer';
import { ongReducer } from './ongReducer';
import { transactionReducer } from './transactionReducer';

const appReducer = combineReducers({
  userReducer,
  animalReducer,
  ongReducer,
  transactionReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
