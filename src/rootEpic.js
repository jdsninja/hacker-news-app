import {
  combineEpics
} from 'redux-observable';

// Import feature wise epic
// import common from './common/epics';
// import catalog from './catalog/epics';
// import home from './home/epics';
// import archives from './archives/epics';

const rootEpic = combineEpics(
  // common,
  // catalog,
  // home,
  // archives
);

export default rootEpic