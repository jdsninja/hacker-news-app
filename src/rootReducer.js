import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// import generalReducer from './generalReducer';
// import identitiesReducer from './pages/identities/identitiesReducer';
// import localesReducer from './locales/localesReducer';
import playersReducer from './containers/players/playersReducer';

export default combineReducers({
  form: formReducer,
  // general: generalReducer,
  // identities: identitiesReducer,
  // locales: localesReducer,
  players: playersReducer,
});
