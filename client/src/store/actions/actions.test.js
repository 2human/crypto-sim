import {
  setPrices,
  setLoginStatus,
  setUserId,
  updatePrices,
  updateLoginStatus,
  getCoinNames,
  setCoinNames,
  setCoinsRequestError,
  resetCoinsRequestError,
  assembleCoins,
} from ".";
import { itReturnsTheRightObject } from "../../assets/js/test-utils/reusableTests/actionTests";
import {
  SET_LOGIN_STATUS,
  UPDATE_LOGIN_STATUS,
  SET_USER_ID,
  UPDATE_PRICES,
  SET_PRICES,
  GET_COIN_NAMES,
  SET_COIN_NAMES,
  SET_COINS_REQUEST_ERROR,
  RESET_COINS_REQUEST_ERROR,
  ASSEMBLE_COINS,
} from "./actionTypes";

describe("actions", () => {
  const status = false;

  itReturnsTheRightObject(setLoginStatus(status), {
    type: SET_LOGIN_STATUS,
    payload: status,
  });

  itReturnsTheRightObject(updateLoginStatus(), {
    type: UPDATE_LOGIN_STATUS,
  });

  const userId = "123123";

  itReturnsTheRightObject(setUserId(userId), {
    type: SET_USER_ID,
    payload: userId,
  });

  itReturnsTheRightObject(updatePrices(), {
    type: UPDATE_PRICES,
  });

  const prices = [{ coin: "coin1" }, { coin: "coin2" }];

  itReturnsTheRightObject(setPrices(prices), {
    type: SET_PRICES,
    payload: prices,
  });

  itReturnsTheRightObject(getCoinNames(), {
    type: GET_COIN_NAMES,
  });

  const coins = [{ id: "coinid", name: "coinname" }];

  itReturnsTheRightObject(setCoinNames(coins), {
    type: SET_COIN_NAMES,
    payload: coins,
  });

  const error = "errorStatus";

  itReturnsTheRightObject(setCoinsRequestError(error), {
    type: SET_COINS_REQUEST_ERROR,
    payload: error,
  });

  itReturnsTheRightObject(assembleCoins(), {
    type: ASSEMBLE_COINS,
  });
});
