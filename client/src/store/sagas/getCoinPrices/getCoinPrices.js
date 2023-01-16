import { call, put } from "redux-saga/effects";
import { setCoinsRequestError, setPrices } from "../../actions";
import { fetchPrices } from "../sagaHelpers";

export function* updatePrices() {
  const result = yield call(fetchPrices);
  if (result.ok) {
    const data = yield call([result, "json"]);
    yield put(setPrices(data.data.rates));
  } else {
    yield put(setCoinsRequestError(true));
  }
}
