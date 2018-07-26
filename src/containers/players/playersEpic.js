import queryString from 'query-string';
import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import ajax from '../../utils/ajaxObservable';
import actions from './partnersActions';
import Config from '../../utils/config';

const getPlayersEpic = action$ =>
  action$.ofType(actions.getPlayers)
    .mergeMap(action => ajax.post(Config.partnersUrl, { body: action.payload })
      .mergeMap(data => Observable.of(actions.getPlayersSuccess(data.response)))
      .catch(error => Observable.of(actions.getPlayersError(error))));

export default combineEpics(
  getPlayersEpic,
);
