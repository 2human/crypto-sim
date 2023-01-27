import { storeSpy, expectRedux } from "expect-redux";
import "whatwg-fetch";
import {
  fetchResponseError,
  fetchResponseOk,
} from "../../../assets/js/test-utils/tools/spyHelpers";
import { configureStore } from "../..";
import { getCoinData, setCoinData, setCoinsRequestError } from "../../actions";

describe("getCoinData", () => {
  let store;

  const coinData = {
    data: [
      {
        id: "coin1id",
        rank: "1",
        symbol: "coin1",
        name: "Coin1",
        supply: "9999",
        maxSupply: "99999",
        marketCapUsd: "999999",
        volumeUsd24Hr: "999",
        priceUsd: "1999",
        changePercent24Hr: "9",
        vwap24Hr: "299",
        explorer: "https://blockchain.info/",
      },
      {
        id: "coin2id",
        rank: "2",
        symbol: "coin2",
        name: "Coin2",
        supply: "9998",
        maxSupply: "99998",
        marketCapUsd: "999998",
        volumeUsd24Hr: "998",
        priceUsd: "1998",
        changePercent24Hr: "8",
        vwap24Hr: "298",
        explorer: "https://blockchain.info/",
      },
    ],
  };

  beforeEach(() => {
    jest.spyOn(window, "fetch").mockReturnValue(fetchResponseOk(coinData));
    store = configureStore([storeSpy]);
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  const dispatchGetData = () => store.dispatch(getCoinData());

  it("submits a request to get coin names", () => {
    dispatchGetData();
    expect(window.fetch).toHaveBeenCalledWith(
      "https://api.coincap.io/v2/assets"
    );
  });

  describe("request success", () => {
    it("sets the coin data", () => {
      dispatchGetData();
      return expectRedux(store)
        .toDispatchAnAction()
        .matching(setCoinData(coinData.data));
    });
  });

  describe("request failed", () => {
    it("sets the error status to true", () => {
      jest.spyOn(window, "fetch").mockReturnValue(fetchResponseError());
      dispatchGetData();
      return expectRedux(store)
        .toDispatchAnAction()
        .matching(setCoinsRequestError(true));
    });
  });
});
