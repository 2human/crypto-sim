import { itMaintainsExistingState } from "../../../../assets/js/test-utils/reusableTests/reducerTests";
import {
  setCoinPrices,
  setLoginStatus,
  setUserId,
  setCoinNames,
  setCoinsRequestError,
  resetCoinsRequestError,
  setCoinStats,
} from "../../../actions";
import { defaultState, coinsReducer } from "./coinsReducer";
import {
  coinsObject,
  assembledCoinData,
  parsedCoins,
  coinsArray,
} from "./coinsReducerHelpers";

//mock of coin names fetched from API
const coinNames = [
  { id: "coin1id", name: "coin1name", unusedProp: "unusedprop1" },
  { id: "coin2id", name: "coin2name", unusedProp: "unusedprop2" },
];

const coinNamesObject = {
  coin1id: { name: "coin1name" },
  coin2id: { name: "coin2name" },
};

//mock of prices fetched from API
const prices = {
  coin1id: 0.2,
  coin2id: 0.1,
};

// mock of assembled coin data assembled from api requests
const coinsWithPricesArray = [
  { id: "coin1id", name: "coin1name", price: 5 },
  { id: "coin2id", name: "coin2name", price: 10 },
];

// mock of assembled coin data assembled from api requests
const assembledCoins = {
  coin1id: {
    name: "coin1name",
    price: 5,
    stats: {
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
  },
  coin2id: {
    name: "coin2name",
    price: 10,
    stats: {
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
  },
};

const coinStats = {
  "coin1id-USD": {
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
  "coin2id-USD": {
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

describe("coinsReducer", () => {
  it("returns the default state when undefined state provided", () => {
    expect(coinsReducer(undefined, {})).toEqual(defaultState);
  });

  describe("setCoinNames", () => {
    itMaintainsExistingState(coinsReducer, setCoinNames(coinNames));

    it("sets the coin names", () => {
      expect(coinsReducer(undefined, setCoinNames(coinNames))).toMatchObject({
        names: coinNames,
      });
    });

    it("updates assembledCoins when all other data exists", () => {
      expect(
        coinsReducer({ prices, stats: coinStats }, setCoinNames(coinNames))
      ).toMatchObject({
        assembledCoins: assembledCoins,
      });
    });
  });

  describe("setCoinPrices", () => {
    itMaintainsExistingState(coinsReducer, setCoinPrices(prices));

    it("sets the coin prices", () => {
      expect(coinsReducer(undefined, setCoinPrices(prices))).toMatchObject({
        prices: prices,
      });
    });

    it("updates assembledCoins when all other data exists", () => {
      expect(
        coinsReducer(
          { names: coinNames, stats: coinStats },
          setCoinPrices(prices)
        )
      ).toMatchObject({
        assembledCoins: assembledCoins,
      });
    });
  });

  describe("setCoinsRequestError", () => {
    const errorStatus = true;

    itMaintainsExistingState(coinsReducer, setCoinsRequestError(errorStatus));
    it("sets the error status to the one given", () => {
      expect(
        coinsReducer(undefined, setCoinsRequestError(errorStatus))
      ).toMatchObject({
        errorStatus: errorStatus,
      });
    });
  });

  describe("setCoinsStats", () => {
    itMaintainsExistingState(coinsReducer, setCoinStats(coinStats));

    it("sets the coin stats", () => {
      expect(coinsReducer(undefined, setCoinStats(coinStats))).toMatchObject({
        stats: coinStats,
      });
    });

    it("updates assembledCoins when all other data exists", () => {
      expect(
        coinsReducer({ names: coinNames, prices }, setCoinStats(coinStats))
      ).toMatchObject({
        assembledCoins: assembledCoins,
      });
    });
  });
});

describe("coinsReducerHelpers", () => {
  describe("coinsObject", () => {
    it("returns the coinsArray in object form", () => {
      expect(coinsObject(coinNames)).toEqual(coinNamesObject);
    });
  });

  describe("assembledCoinData", () => {
    it("returns null when names is null", () => {
      expect(assembledCoinData({ names: null, prices })).toEqual(null);
    });

    it("returns null when prices is null", () => {
      expect(assembledCoinData({ names: coinNames, prices: null })).toEqual(
        null
      );
    });

    it("returns the combined coin data when all coins have prices", () => {
      expect(
        assembledCoinData({ names: coinNames, prices, stats: coinStats })
      ).toEqual(assembledCoins);
    });

    it("filters out coins that do not have prices", () => {
      expect(
        assembledCoinData({
          names: [...coinNames, { id: "nopriceid", name: "nopricename" }],
          prices,
          stats: { ...coinStats, "nopriceid-USD": { props: "props" } },
        })
      ).toEqual(assembledCoins);
    });

    it("filters out coins that do not have stats", () => {
      expect(
        assembledCoinData({
          names: [...coinNames, { id: "nostatsid", name: "nostatsname" }],
          prices: { ...prices, nostatsid: 2 },
          stats: coinStats,
        })
      ).toEqual(assembledCoins);
    });
  });
});
