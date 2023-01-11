import { storeSpy, expectRedux } from "expect-redux";
import "whatwg-fetch";
import {
  fetchResponseError,
  fetchResponseOk,
} from "../../../assets/js/test-utils/tools/spyHelpers";
import { configureStore } from "../..";
import {
  assembleCoins,
  getCoinNames,
  setCoinsRequestError,
  updatePrices,
} from "../../actions";

describe("getCoinNames", () => {
  let store;

  beforeEach(() => {
    store = configureStore([storeSpy]);
  });

  const dispatchUpdate = () => store.dispatch(assembleCoins());

  it("sets the request error to false", () => {
    dispatchUpdate();
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(setCoinsRequestError(false));
  });

  it("gets the coin names", () => {
    dispatchUpdate();
    return expectRedux(store).toDispatchAnAction().matching(getCoinNames());
  });

  it("gets the coin prices", () => {
    dispatchUpdate();
    return expectRedux(store).toDispatchAnAction().matching(updatePrices());
  });
});
