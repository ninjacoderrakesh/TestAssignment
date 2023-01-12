import {fork, spawn} from 'redux-saga/effects';
import Matches from './MatchesSaga';

function* RootSaga() {
  yield spawn(Matches);
}

export default RootSaga;
