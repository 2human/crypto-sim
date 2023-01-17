import { call, put } from "redux-saga/effects";
import { setCoinsRequestError, setPrices } from "../../actions";
import { fetchCoinPrices } from "../sagaHelpers";

export function* getCoinPrices() {
  const result = yield call(fetchCoinPrices);
  if (result.ok) {
    const data = yield call([result, "json"]);
    yield put(setPrices(data.data.rates));
  } else {
    yield put(setCoinsRequestError(true));
  }
}
