import { createReducer } from './redux';
import { ACTIONS } from './constants';

const initialState = {
  topStoriesIds: null,
  stories: [],
  comments: [],
};

export default createReducer(initialState, {
  [ACTIONS.GET_TOP_STORIES_IDS]: (state) => ({
    ...state,
    loading: true,
  }),
  [ACTIONS.GET_TOP_STORIES_IDS_SUCCESS]: (state, { data }) => {
    return {
      ...state,
      topStoriesIds: data,
      loading: false,
      error: null,
    }
  },
  [ACTIONS.GET_TOP_STORIES_IDS_FAILURE]: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),
  [ACTIONS.GET_STORY]: (state) => ({
    ...state,
    loading: true,
  }),
  [ACTIONS.GET_STORY_SUCCESS]: (state, { data }) => {
    return {
      ...state,
      stories: [
        ...state.stories,
        data
      ],
      loading: false,
      error: null,
    }
  },
  [ACTIONS.GET_STORY_FAILURE]: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),
  [ACTIONS.GET_COMMENT]: (state) => ({
    ...state,
    loading: true,
  }),
  [ACTIONS.GET_COMMENT_SUCCESS]: (state, { data }) => {
    return {
      ...state,
      comments: [
        ...state.comments,
        data
      ],
      loading: false,
      error: null,
    }
  },
  [ACTIONS.GET_COMMENT_FAILURE]: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),
});
