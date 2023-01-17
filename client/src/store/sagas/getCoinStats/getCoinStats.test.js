import { storeSpy, expectRedux } from "expect-redux";
import "whatwg-fetch";
import { fetchResponseOk } from "../../../assets/js/test-utils/tools/spyHelpers";
import { configureStore } from "../..";
import { getCoinStats, setCoinStats } from "../../actions";

describe("getCoinStats", () => {
  let store;

  const stats = {
    "coin1id-usd": {
      stats_30day: {
        volume: "9990000",
      },
      stats_24hour: {
        open: "99",
        high: "100",
        low: "98",
        last: "99.5",
        volume: "99999",
      },
    },
    "coin2id-usd": {
      stats_30day: {
        volume: "880000",
      },
      stats_24hour: {
        open: "88",
        high: "90",
        low: "86",
        last: "88",
        volume: "88888",
      },
    },
  };

  beforeEach(() => {
    jest.spyOn(window, "fetch").mockReturnValue(fetchResponseOk(stats));
    store = configureStore([storeSpy]);
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  const dispatchGetStats = data => store.dispatch(getCoinStats());

  it("submits a request to get coin stats", () => {
    dispatchGetStats();
    expect(window.fetch).toHaveBeenCalledWith(
      "https://api.exchange.coinbase.com/products/stats"
    );
  });

  describe("request success", () => {
    // it("sets the current prices on succes", () => {
    //   dispatchUpdate();
    //   return expectRedux(store)
    //     .toDispatchAnAction()
    //     .matching(setCoinStats(prices.data.rates));
    // });
  });

  // describe("request failed", () => {
  //   it("sets the error status to true", () => {
  //     jest.spyOn(window, "fetch").mockReturnValue(fetchResponseError());
  //     dispatchUpdate();
  //     return expectRedux(store)
  //       .toDispatchAnAction()
  //       .matching(setCoinsRequestError(true));
  //   });
  // });
});
