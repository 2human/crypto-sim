import { call, put } from "redux-saga/effects";
import { setCoins } from "../../actions";
import { fetchCoins } from "../sagaHelpers";

export function* getCoins() {
  const result = yield call(fetchCoins);
  if (result.ok) {
    const coins = yield call([result, "json"]);
    yield put(setCoins(coins));
  }
}
