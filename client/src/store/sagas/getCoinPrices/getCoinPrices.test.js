import { storeSpy, expectRedux } from "expect-redux";
import "whatwg-fetch";
import {
  fetchResponseError,
  fetchResponseOk,
} from "../../../assets/js/test-utils/tools/spyHelpers";
import { configureStore } from "../..";
import { setCoinsRequestError, setPrices, updatePrices } from "../../actions";

describe("updatePrices", () => {
  let store;

  const prices = {
    data: {
      rates: {
        coin1: 9.99,
        coin2: 0.98,
      },
    },
  };

  beforeEach(() => {
    jest.spyOn(window, "fetch").mockReturnValue(fetchResponseOk(prices));
    store = configureStore([storeSpy]);
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  const dispatchUpdate = data => store.dispatch(updatePrices());

  it("submits a request to get coin prices", () => {
    dispatchUpdate();
    expect(window.fetch).toHaveBeenCalledWith(
      "https://api.coinbase.com/v2/exchange-rates?currency=USD"
    );
  });

  describe("request success", () => {
    it("sets the current prices on succes", () => {
      dispatchUpdate();
      return expectRedux(store)
        .toDispatchAnAction()
        .matching(setPrices(prices.data.rates));
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
