import {
  SET_COINS,
  SET_COINS_REQUEST_ERROR,
  SET_PRICES,
} from "../../actions/actionTypes";
import {
  coinsObject,
  coinsWithPrices,
  parsedCoins,
} from "./pricesReducerHelpers";

export const defaultState = {
  coins: {},
  names: [],
  prices: {},
  errorStatus: false,
};

export const pricesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_COINS:
      return {
        ...state,
        coins: coinsObject(action.payload),
        names: action.payload,
      };
    case SET_PRICES:
      return {
        ...state,
        coins: coinsWithPrices(state.coins, action.payload),
        prices: action.payload,
      };
    case SET_COINS_REQUEST_ERROR:
      return { ...state, errorStatus: action.payload };
    default:
      return state;
  }
};
