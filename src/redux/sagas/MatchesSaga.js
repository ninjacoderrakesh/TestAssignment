import axios from 'axios';
import {apply, call, put, takeLatest} from 'redux-saga/effects';
import {API_URL, GetData, PostData} from '../../assets/LocalStorage';
import {
  GET_MATCHES_FAIL,
  GET_MATCHES_REQUEST,
  GET_MATCHES_SUCCESS,
  LOGIN_REQUEST,
} from '../Actions';

const API_URl = 'http://demo1529565.mockable.io/';

function fetchProductsApi(payload) {
  return axios
    .get(API_URl + payload?.endpoint)
    .then(response => response)
    .catch(error => ({error}));
}

function* getMatches(action) {
  try {
    let payload = {
      endpoint: 'matches',
    };
    const result = yield call(fetchProductsApi, payload);

    if (result.status === 200) {
      yield put({type: GET_MATCHES_SUCCESS, payload: result?.data});
    } else {
      yield put({
        type: GET_MATCHES_FAIL,
        payload: 'No Matches Found Please Again Later.',
      });
    }
  } catch (e) {
    yield put({
      type: GET_MATCHES_FAIL,
      payload: 'Something Went Wrong please try later.',
    });
  }
}

function* Matches() {
  yield takeLatest(GET_MATCHES_REQUEST, getMatches);
}

export default Matches;
