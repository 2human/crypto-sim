import {
  legacy_createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import createSagaMiddleware from "redux-saga";
import { takeLatest } from "redux-saga/effects";
import {
  UPDATE_PRICES,
  UPDATE_LOGIN_STATUS,
  GET_COINS,
} from "./actions/actionTypes";
import { authReducer } from "./reducers/authReducer/authReducer";
import { updatePrices } from "./sagas/updatePrices/updatePrices";
import { updateLogin } from "./sagas/updateLogin/updateLogin";
import { pricesReducer } from "./reducers/priceReducer/pricesReducer";
import { getCoins } from "./sagas/getCoins/getCoinNames";

function* rootSaga() {
  yield takeLatest(UPDATE_LOGIN_STATUS, updateLogin);
  yield takeLatest(UPDATE_PRICES, updatePrices);
  yield takeLatest(GET_COINS, getCoins);
}

export const configureStore = (storeEnhancers = []) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = legacy_createStore(
    combineReducers({ auth: authReducer, prices: pricesReducer }),
    compose(...[applyMiddleware(sagaMiddleware), ...storeEnhancers])
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
