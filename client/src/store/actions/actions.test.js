import {
  setCurrentPrices,
  setLoginStatus,
  setUserId,
  updatePrices,
  updateLoginStatus,
} from ".";
import { itReturnsTheRightObject } from "../../assets/js/test-utils/reusableTests/actionTests";
import {
  SET_LOGIN_STATUS,
  UPDATE_LOGIN_STATUS,
  SET_USER_ID,
  UPDATE_CURRENT_PRICES,
  SET_CURRENT_PRICES,
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
    type: UPDATE_CURRENT_PRICES,
  });

  const prices = [{ coin: "coin1" }, { coin: "coin2" }];

  itReturnsTheRightObject(setCurrentPrices(prices), {
    type: SET_CURRENT_PRICES,
    payload: prices,
  });
});
