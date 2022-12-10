import { itMaintainsExistingState } from "../../../assets/js/test-utils/reusableTests/reducerTests";
import { setLoginStatus, setUserId } from "../../actions";
import { authReducer, defaultState } from "./authReducer";

describe("authReducer", () => {
  it("returns the default state when undefined state provided", () => {
    expect(authReducer(undefined, {})).toEqual(defaultState);
  });

  describe("setLoginStatus", () => {
    itMaintainsExistingState(authReducer, setLoginStatus(true));
    it("updates the login status", () => {
      expect(authReducer(undefined, setLoginStatus(true))).toMatchObject({
        loggedIn: true,
      });
    });
  });

  describe("setUserId", () => {
    const userId = "123123";
    itMaintainsExistingState(authReducer, setUserId(userId));
    it("updates the user id", () => {
      expect(authReducer(undefined, setUserId(userId))).toMatchObject({
        userId,
      });
    });
  });
});
