import {
  legacy_createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import createSagaMiddleware from "redux-saga";
import { takeLatest } from "redux-saga/effects";
import {
  GET_COIN_PRICES,
  UPDATE_LOGIN_STATUS,
  GET_COIN_NAMES,
  ASSEMBLE_COINS,
  GET_COIN_STATS,
  GET_COIN_DATA,
} from "./actions/actionTypes";
import { authReducer } from "./reducers/authReducer/authReducer";
import { getCoinPrices } from "./sagas/getCoinPrices/getCoinPrices";
import { updateLogin } from "./sagas/updateLogin/updateLogin";
import { coinsReducer } from "./reducers/coinsReducer/coinsReducer";
import { getCoinNames } from "./sagas/getCoinNames/getCoinNames";
import { assembleCoins } from "./sagas/assembleCoins/assembleCoins";
import { getCoinStats } from "./sagas/getCoinStats/getCoinStats";
import { getCoinData } from "./sagas/getCoinData/getCoinData";

function* rootSaga() {
  yield takeLatest(UPDATE_LOGIN_STATUS, updateLogin);
  yield takeLatest(GET_COIN_PRICES, getCoinPrices);
  yield takeLatest(GET_COIN_NAMES, getCoinNames);
  yield takeLatest(GET_COIN_STATS, getCoinStats);
  yield takeLatest(ASSEMBLE_COINS, assembleCoins);
  yield takeLatest(GET_COIN_DATA, getCoinData);
}

export const configureStore = (storeEnhancers = []) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = legacy_createStore(
    combineReducers({ auth: authReducer, coins: coinsReducer }),
    compose(...[applyMiddleware(sagaMiddleware), ...storeEnhancers])
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
