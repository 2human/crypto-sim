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
  SET_COIN_STATS,
  GET_COINS_DATA,
  GET_COIN_DATA,
  SET_COIN_DATA,
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

export const getCoinPrices = () => {
  return { type: GET_COIN_PRICES };
};

export const setCoinPrices = prices => {
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
  return { type: SET_COIN_STATS, payload: stats };
};

export const getCoinData = data => {
  return { type: GET_COIN_DATA, payload: data };
};

export const setCoinData = data => {
  return { type: SET_COIN_DATA, payload: data };
};
