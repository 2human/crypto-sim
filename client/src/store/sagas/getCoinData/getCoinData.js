import { call, put } from "redux-saga/effects";
import { setCoinData, setCoinNames, setCoinsRequestError } from "../../actions";
import { fetchCoinData } from "../sagaHelpers";

export function* getCoinData() {
  const result = yield call(fetchCoinData);
  if (result.ok) {
    const coinData = yield call([result, "json"]);
    yield put(setCoinData(coinData.data));
  } else {
    yield put(setCoinsRequestError(true));
  }
}
