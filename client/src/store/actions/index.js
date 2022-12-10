import {
  SET_LOGIN_STATUS,
  UPDATE_LOGIN_STATUS,
  SET_USER_ID,
  UPDATE_CURRENT_PRICES,
  SET_CURRENT_PRICES,
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
  return { type: UPDATE_CURRENT_PRICES };
};

export const setCurrentPrices = prices => {
  return { type: SET_CURRENT_PRICES, payload: prices };
};
