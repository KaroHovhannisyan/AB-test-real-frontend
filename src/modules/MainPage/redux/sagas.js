import { call, put, takeLatest } from "redux-saga/effects";

import abTestService from "../services/AbTestService";
import * as actions from "./actions";
import * as types from "./types";
import {allUsersDataToRequest, usersDataToRequest} from "./dataAdapter";

function* getUsersAsync() {
  try {
    const response = yield call(() => abTestService.getUsers());

    if (response.hasError) {
      yield put(actions.getUsersError(response.errors));
    } else {
      const { data } = response.payload;
      yield put(
        actions.getUsersSuccess(data)
      );
    }
  } catch (err) {
    yield put(actions.getUsersError([err.message]));
  }
}

function* watchGetUsersAsync() {
  yield takeLatest(types.GET_USERS, getUsersAsync);
}

function* saveUsersAsync(action) {
  try {
    const request = usersDataToRequest(action.payload);

    const response = yield call(() => abTestService.saveUsers(request));

    if (response.hasError) {
      yield put(actions.saveUsersError(response.errors));
    } else {
      const { data } = response.payload;
      yield put(actions.saveUsersSuccess(data));
      yield put(actions.deleteUser(data));
      yield put(actions.getUsers());
    }
  } catch (err) {
    yield put(actions.getUsersError([err.message]));
  }
}

function* watchSaveUsersAsync() {
  yield takeLatest(types.SAVE_USERS, saveUsersAsync);
}


function* saveAllUsersAsync(action) {
  try {
    const request = allUsersDataToRequest(action.payload);

    const response = yield call(() => abTestService.saveUsers(request));

    if (response.hasError) {
      yield put(actions.saveAllUsersError(response.errors));
    } else {
      const { data } = response.payload;
      yield put(actions.deleteAllNewUsers());
      yield put(actions.saveAllUsersSuccess(data));
      yield put(actions.getUsers());
    }
  } catch (err) {
    yield put(actions.getUsersError([err.message]));
  }
}

function* watchSaveAllUsersAsync() {
  yield takeLatest(types.SAVE_ALL_USERS, saveAllUsersAsync);
}


function* getCalculateAsync(action) {
  try {
    const response = yield call(() => abTestService.getCalculate(action.payload));

    if (response.hasError) {
      yield put(actions.getCalculateError(response.errors));
    } else {
      yield put(actions.getCalculateSuccess({
        result: response.payload,
        dateRange: action.payload
      }));
    }
  } catch (err) {
    yield put(actions.getCalculateError([err.message]));
  }
}

function* watchGetCalculateAsync() {
  yield takeLatest(types.GET_CALCULATE, getCalculateAsync);
}


function* deleteFromDBAsync(action) {
  try {
    const response = yield call(() => abTestService.deleteUser(action.payload));

    if (response.hasError) {
      yield put(actions.deleteFromDBError(response.errors));
    } else {
      const { data } = response.payload;
      yield put(actions.deleteFromDBSuccess(data));
      yield put(actions.getUsers());
    }
  } catch (err) {
    yield put(actions.deleteFromDBError([err.message]));
  }
}

function* watchDeleteFromDBAsync() {
  yield takeLatest(types.DELETE_FROM_DB, deleteFromDBAsync);
}

export default {
  watchGetUsersAsync,
  watchSaveUsersAsync,
  watchSaveAllUsersAsync,
  watchGetCalculateAsync,
  watchDeleteFromDBAsync,
};
