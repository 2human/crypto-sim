import { call, put } from "redux-saga/effects";
import { setCurrentPrices } from "../actions";
import { fetchPrices } from "./sagaHelpers";

export function* updatePrices() {
  const result = yield call(fetchPrices);
  const data = yield call([result, "json"]);
  if (result.ok) {
    yield put(setCurrentPrices(data));
  }
}
