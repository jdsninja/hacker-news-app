import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose } from 'redux';

import epic from './rootEpic';
import reducer from './rootReducer';

// eslint-disable-next-line no-underscore-dangle
const devTools = process.env.REACT_APP_ENV === 'local' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools || compose;
const epicMiddleware = createEpicMiddleware();
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(epicMiddleware)),
);
epicMiddleware.run(epic);
export default store;
