import { assembledCoinData } from "./pricesReducerHelpers";
import {
  SET_COIN_NAMES,
  SET_COINS_REQUEST_ERROR,
  SET_PRICES,
} from "../../actions/actionTypes";

export const defaultState = {
  assembledCoins: {},
  names: null,
  prices: null,
  errorStatus: false,
};

export const pricesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_COIN_NAMES:
      return {
        ...state,
        assembledCoins: assembledCoinData({ ...state, names: action.payload }),
        names: action.payload,
      };
    case SET_PRICES:
      return {
        ...state,
        assembledCoins: assembledCoinData({ ...state, prices: action.payload }),
        prices: action.payload,
      };
    case SET_COINS_REQUEST_ERROR:
      return { ...state, errorStatus: action.payload };
    default:
      return state;
  }
};
