import {combineReducers} from 'redux';
import {MatchesReducer} from './reducers/MatchesReducer';

export const allReducer = combineReducers({
  MatchesReducer,
});
