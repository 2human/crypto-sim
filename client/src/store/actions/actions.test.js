import { setLoginStatus, setUserId, updateLoginStatus } from ".";
import { itReturnsTheRightObject } from "../../assets/js/test-utils/reusableTests/actionTests";
import {
  SET_LOGIN_STATUS,
  UPDATE_LOGIN_STATUS,
  SET_USER_ID,
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
});
