import {
  setPrices,
  setLoginStatus,
  setUserId,
  updatePrices,
  updateLoginStatus,
  getCoins,
  setCoins,
  setCoinsRequestError,
} from ".";
import { itReturnsTheRightObject } from "../../assets/js/test-utils/reusableTests/actionTests";
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

  itReturnsTheRightObject(getCoins(), {
    type: GET_COINS,
  });

  const coins = [{ id: "coinid", name: "coinname" }];

  itReturnsTheRightObject(setCoins(coins), {
    type: SET_COINS,
    payload: coins,
  });

  const error = "errorStatus";

  itReturnsTheRightObject(setCoinsRequestError(error), {
    type: SET_COINS_REQUEST_ERROR,
    payload: error,
  });
});
