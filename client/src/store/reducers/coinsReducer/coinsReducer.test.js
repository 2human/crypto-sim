import { itMaintainsExistingState } from "../../../assets/js/test-utils/reusableTests/reducerTests";
import { setCoinData } from "../../actions";
import { defaultState, coinsReducer } from "./coinsReducer";

const coinData = [
  {
    id: "coin1id",
    rank: "1",
    symbol: "coin1id",
    name: "coin1name",
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
    symbol: "coin2id",
    name: "coin2name",
    supply: "9998",
    maxSupply: "99998",
    marketCapUsd: "999998",
    volumeUsd24Hr: "998",
    priceUsd: "1998",
    changePercent24Hr: "8",
    vwap24Hr: "298",
    explorer: "https://blockchain.info/",
  },
];

describe("coinsReducer", () => {
  it("returns the default state when undefined state provided", () => {
    expect(coinsReducer(undefined, {})).toEqual(defaultState);
  });

  describe("setCoinData", () => {
    itMaintainsExistingState(coinsReducer, setCoinData(coinData));

    it("sets the coin names", () => {
      expect(coinsReducer(undefined, setCoinData(coinData))).toMatchObject({
        coins: coinData,
      });
    });
  });
});
