import {
  SET_LOGIN_STATUS,
  UPDATE_LOGIN_STATUS,
  SET_USER_ID,
  UPDATE_PRICES,
  SET_PRICES,
  GET_COINS,
  SET_COINS,
  SET_COINS_REQUEST_ERROR,
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
  return { type: UPDATE_PRICES };
};

export const setPrices = prices => {
  return { type: SET_PRICES, payload: prices };
};

export const getCoins = () => {
  return { type: GET_COINS };
};

export const setCoins = coins => {
  return { type: SET_COINS, payload: coins };
};

export const setCoinsRequestError = status => {
  return { type: SET_COINS_REQUEST_ERROR, payload: status };
};
