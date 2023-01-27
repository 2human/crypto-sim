import { call, put } from "redux-saga/effects";
import { setCoinsRequestError, setCoinStats } from "../../actions";
import { fetchCoinPrices, fetchCoinStats } from "../sagaHelpers";

export function* getCoinStats() {
  const result = yield call(fetchCoinStats);
  if (result.ok) {
    const data = yield call([result, "json"]);
    yield put(setCoinStats(data));
  } else {
    yield put(setCoinsRequestError(true));
  }
}
