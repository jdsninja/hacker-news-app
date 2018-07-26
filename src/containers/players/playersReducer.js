import { createReducer } from '../../utils/redux';

import actions from './playersActions';

// import Pagination from '../../domain/models/Pagination';
// import Sorting from '../../domain/models/Sorting';
// import { createFromPayload as createPagination } from '../../domain/factories/paginationFactory';
// import { createFromPayload as createSorting } from '../../domain/factories/sortingFactory';

const initialState = {
  error: null,
  list: ['asdf'],
  loading: false,
  saving: false,
  // pagination: new Pagination(),
  // sorting: new Sorting(),
  filters: {},
  selected: null,
};

export default createReducer(initialState, {
  [actions.getPlayers]: state => ({
    error: null,
    loading: true,
    selected: null,
    ...state,
  }),
  [actions.getPlayersError]: (state, error) => ({
    ...state,
    error,
    loading: false,
  }),
  [actions.getPlayersSuccess]: (state, selected) => ({
    ...state,
    loading: false,
    selected,
  }),
  // [actions.deletePartner]: state => ({
  //   error: null,
  //   loading: true,
  //   selected: null,
  //   ...state,
  // }),
  // [actions.deletePartnerError]: (state, error) => ({
  //   ...state,
  //   error,
  //   loading: false,
  // }),
  // [actions.deletePartnerSuccess]: (state, selected) => ({
  //   ...state,
  //   loading: false,
  //   selected,
  // }),
  // [actions.getPartner]: state => ({
  //   ...state,
  //   error: null,
  //   loading: true,
  //   selected: null,
  // }),
  // [actions.getPartnerError]: (state, error) => ({
  //   ...state,
  //   error,
  //   loading: false,
  // }),
  // [actions.getPartnerSuccess]: (state, selected) => ({
  //   ...state,
  //   loading: false,
  //   selected,
  // }),
  // [actions.getPartners]: state => ({
  //   ...state,
  //   list: [],
  //   loading: true,
  // }),
  // [actions.getPartnersError]: (state, error) => ({
  //   ...state,
  //   error,
  //   loading: false,
  // }),
  // [actions.getPartnersSuccess]: (state, { docs, ...pagination }) => ({
  //   ...state,
  //   list: docs,
  //   loading: false,
  //   pagination: createPagination(pagination),
  // }),
  // [actions.updatePartnersQuery]: (state, {
  //   page,
  //   sort,
  //   sortDirection,
  //   ...filters
  // }) => ({
  //   ...state,
  //   pagination: createPagination({ page, pages: state.pagination.pages }),
  //   sorting: createSorting({ sort, sortDirection }),
  //   filters,
  // }),
  // [actions.updatePartner]: state => ({
  //   ...state,
  //   error: null,
  //   saving: true,
  //   selected: null,
  // }),
  // [actions.updatePartnerError]: (state, error) => ({
  //   ...state,
  //   error,
  //   saving: false,
  // }),
  // [actions.updatePartnerSuccess]: (state, selected) => ({
  //   ...state,
  //   saving: false,
  //   selected,
  // }),
});
