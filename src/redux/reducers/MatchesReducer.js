import {
  GET_MATCHES_FAIL,
  GET_MATCHES_REQUEST,
  GET_MATCHES_SUCCESS,
} from '../Actions';

let initialState = {
  loader: false,
  data: [],
  error: '',
  oldIndex: 0,
  newIndex: 1,
};

const getData = state => {};

export const MatchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MATCHES_REQUEST:
      return {
        ...state,
        loader: true,
        data: [],
        error: '',
        oldIndex: 0,
        newIndex: 1,
      };
    case GET_MATCHES_SUCCESS:
      return {...state, loader: false, data: action.payload, error: ''};
    case GET_MATCHES_FAIL:
      return {...state, loader: false, data: [], error: action.payload};
    default:
      return state;
  }
};
