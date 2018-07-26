import { request } from './utils/helpers';
import { ACTIONS } from './constants';

const myRequest = request();

export function getTopStoriesIds() {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.GET_TOP_STORIES_IDS,
    });

    return myRequest('get', { path: '/topstories.json' })
      .then((response) => {
        return dispatch({
          type: ACTIONS.GET_TOP_STORIES_IDS_SUCCESS,
          payload: {
            data: response,
          },
        });
      })
      .catch((error) => {
        return dispatch({
          type: ACTIONS.GET_TOP_STORIES_IDS_FAILURE,
          payload: {
            error: error.body,
          },
        });
      });
  };
}

export function getStory(storyId) {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.GET_STORY,
    });

    return myRequest('get', { path: `/item/${storyId}.json`})
      .then((response) => {
        return dispatch({
          type: ACTIONS.GET_STORY_SUCCESS,
          payload: {
            data: response,
          },
        });
      })
      .catch((error) => {
        return dispatch({
          type: ACTIONS.GET_STORY_FAILURE,
          payload: {
            error: error.body,
          },
        });
      });
  };
}

export function getComment(commentId) {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.GET_COMMENT,
    });

    return myRequest('get', { path: `/item/${commentId}.json`})
      .then((response) => {
        return dispatch({
          type: ACTIONS.GET_COMMENT_SUCCESS,
          payload: {
            data: response,
          },
        });
      })
      .catch((error) => {
        return dispatch({
          type: ACTIONS.GET_COMMENT_FAILURE,
          payload: {
            error: error.body,
          },
        });
      });
  };
}
