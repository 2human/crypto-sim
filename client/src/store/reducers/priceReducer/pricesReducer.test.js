import { itMaintainsExistingState } from "../../../assets/js/test-utils/reusableTests/reducerTests";
import { setCurrentPrices, setLoginStatus, setUserId } from "../../actions";
import { defaultState, pricesReducer } from "./pricesReducer";

describe("authReducer", () => {
  it("returns the default state when undefined state provided", () => {
    expect(authReducer(undefined, {})).toEqual(defaultState);
  });

  describe("setPrices", () => {
    itMaintainsExistingState(authReducer, setCurrentPrices(true));
    it("updates the login status", () => {
      expect(pricesReducer(undefined, setCurrentPrices(true))).toMatchObject({
        prices,
      });
    });
  });
});
