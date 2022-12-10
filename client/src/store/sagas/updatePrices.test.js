import { storeSpy, expectRedux } from "expect-redux";
import "whatwg-fetch";
import { fetchResponseOk } from "../../assets/js/test-utils/tools/spyHelpers";
import { configureStore } from "..";
import { setCurrentPrices, updatePrices } from "../actions";

describe("updateLogin", () => {
  let store;

  const coins = [{ name: "coin1" }, { name: "coin2" }];

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
        .matching(setCurrentPrices(coins));
    });
  });
});
