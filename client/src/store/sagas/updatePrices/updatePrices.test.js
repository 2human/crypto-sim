import { storeSpy, expectRedux } from "expect-redux";
import "whatwg-fetch";
import {
  fetchResponseError,
  fetchResponseOk,
} from "../../../assets/js/test-utils/tools/spyHelpers";
import { configureStore } from "../..";
import { setCoinsRequestError, setPrices, updatePrices } from "../../actions";

describe("updateLogin", () => {
  let store;

  const coins = {
    data: {
      rates: {
        coin1: 9.99,
        coin2: 0.98,
      },
    },
  };

  beforeEach(() => {
    jest.spyOn(window, "fetch").mockReturnValue(fetchResponseOk(coins));
    store = configureStore([storeSpy]);
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  const dispatchUpdate = data => store.dispatch(updatePrices());

  it("submits a request to check login status", () => {
    dispatchUpdate();
    expect(window.fetch).toHaveBeenCalledWith(
      "https://api.coinbase.com/v2/exchange-rates?currency=USD"
    );
  });

  describe("request success", () => {
    it("sets the current prices on successful", () => {
      dispatchUpdate();
      return expectRedux(store)
        .toDispatchAnAction()
        .matching(setPrices(coins.data.rates));
    });
  });

  describe("request failed", () => {
    it("sets the error status to true", () => {
      jest.spyOn(window, "fetch").mockReturnValue(fetchResponseError());
      dispatchUpdate();
      return expectRedux(store)
        .toDispatchAnAction()
        .matching(setCoinsRequestError(true));
    });
  });
});
