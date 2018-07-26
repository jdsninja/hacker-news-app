
/**
 * Helper function to avoid boilerplate of switch/case syntax.
 * It take a object and check if the type of the action received is
 * defined in that object.
 *
 * @export
 * @param {any} initialState
 * @param {any} reducerMap
 * @returns
 */
export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return reducer
      ? reducer(state, action.payload)
      : state;
  };
}
