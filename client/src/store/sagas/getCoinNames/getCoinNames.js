import { call, put } from "redux-saga/effects";
import { setCoinNames, setCoinsRequestError } from "../../actions";
import { fetchCoinNames } from "../sagaHelpers";

export function* getCoinNames() {
  const result = yield call(fetchCoinNames);
  if (result.ok) {
    const coins = yield call([result, "json"]);
    yield put(setCoinNames(coins));
  } else {
    yield put(setCoinsRequestError(true));
  }
}
