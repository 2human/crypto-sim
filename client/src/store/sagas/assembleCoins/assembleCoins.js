import { call, put } from "redux-saga/effects";
import {
  getCoinNames,
  setCoinsRequestError,
  getCoinPrices,
} from "../../actions";

export function* assembleCoins() {
  yield put(setCoinsRequestError(false));
  yield put(getCoinNames());
  yield put(getCoinPrices());
}
