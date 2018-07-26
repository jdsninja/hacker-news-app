import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import HttpHandler from './utils/HttpHandler';
import news from './reducer';

const reducer = combineReducers({
  news
});

// Note: passing middleware as the last argument requires redux@>=3.1.0
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk)),
);

HttpHandler.setStore(store);

export default store;
