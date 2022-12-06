import { call, put } from "redux-saga/effects";
import { setLoginStatus, setUserId } from "../actions";
import { fetchUser } from "./sagaHelpers";

export function* updateLogin() {
  const result = yield call(fetchUser);
  if (result.ok) {
    const user = yield call([result, "json"]) || {};
    if (user._id) {
      yield put(setLoginStatus(true));
      yield put(setUserId(user.id));
    } else {
      yield put(setLoginStatus(false));
      yield put(setUserId(undefined));
    }
  } else {
    yield put(setLoginStatus(false));
    yield put(setUserId(undefined));
  }
}
