import { call, put } from "redux-saga/effects";
import { setCoinsRequestError, setCoinPrices } from "../../actions";
import { fetchCoinPrices } from "../sagaHelpers";

export function* getCoinPrices() {
  const result = yield call(fetchCoinPrices);
  if (result.ok) {
    const data = yield call([result, "json"]);
    yield put(setCoinPrices(data.data.rates));
  } else {
    yield put(setCoinsRequestError(true));
  }
}
