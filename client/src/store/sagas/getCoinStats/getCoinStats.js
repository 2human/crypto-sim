import { call, put } from "redux-saga/effects";
import { setCoinsRequestError, setPrices } from "../../actions";
import { fetchCoinPrices, fetchCoinStats } from "../sagaHelpers";

export function* getCoinStats() {
  const result = yield call(fetchCoinStats);
  if (result.ok) {
    const data = yield call([result, "json"]);
    console.log(data);
    // yield put(setPrices(data.data.rates));
  } else {
    //   yield put(setCoinsRequestError(true));
  }
}
