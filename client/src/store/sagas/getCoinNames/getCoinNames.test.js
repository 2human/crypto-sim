import { storeSpy, expectRedux } from "expect-redux";
import "whatwg-fetch";
import {
  fetchResponseError,
  fetchResponseOk,
} from "../../../assets/js/test-utils/tools/spyHelpers";
import { configureStore } from "../..";
import {
  getCoinNames,
  setCoinNames,
  setCoinsRequestError,
} from "../../actions";

describe("getCoinNames", () => {
  let store;

  const coins = [
    { id: "coin1id", name: "coin1name", unusedProp: "unusedprop1" },
    { id: "coin2id", name: "coin2name", unusedProp: "unusedprop2" },
  ];

  beforeEach(() => {
    jest.spyOn(window, "fetch").mockReturnValue(fetchResponseOk(coins));
    store = configureStore([storeSpy]);
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  const dispatchUpdate = () => store.dispatch(getCoinNames());

  it("submits a request to get coin names", () => {
    dispatchUpdate();
    expect(window.fetch).toHaveBeenCalledWith(
      "https://api.pro.coinbase.com/currencies"
    );
  });

  describe("request success", () => {
    it("sets the coin names", () => {
      dispatchUpdate();
      return expectRedux(store)
        .toDispatchAnAction()
        .matching(setCoinNames(coins));
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
