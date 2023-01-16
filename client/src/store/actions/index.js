import {
  SET_LOGIN_STATUS,
  UPDATE_LOGIN_STATUS,
  SET_USER_ID,
  GET_COIN_PRICES,
  SET_PRICES,
  GET_COIN_NAMES,
  SET_COIN_NAMES,
  SET_COINS_REQUEST_ERROR,
  RESET_COINS_REQUEST_ERROR,
  ASSEMBLE_COINS,
  GET_COIN_STATS,
} from "./actionTypes";

export const setLoginStatus = status => {
  return { type: SET_LOGIN_STATUS, payload: status };
};

export const updateLoginStatus = () => {
  return { type: UPDATE_LOGIN_STATUS };
};

export const setUserId = userId => {
  return { type: SET_USER_ID, payload: userId };
};

export const updatePrices = () => {
  return { type: GET_COIN_PRICES };
};

export const setPrices = prices => {
  return { type: SET_PRICES, payload: prices };
};

export const getCoinNames = () => {
  return { type: GET_COIN_NAMES };
};

export const setCoinNames = coins => {
  return { type: SET_COIN_NAMES, payload: coins };
};

export const setCoinsRequestError = status => {
  return { type: SET_COINS_REQUEST_ERROR, payload: status };
};

export const assembleCoins = () => {
  return { type: ASSEMBLE_COINS };
};

export const getCoinStats = () => {
  return { type: GET_COIN_STATS };
};

export const setCoinStats = stats => {
  return { type: GET_COIN_STATS, payload: stats };
};
