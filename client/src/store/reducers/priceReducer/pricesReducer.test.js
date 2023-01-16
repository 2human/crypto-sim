import { itMaintainsExistingState } from "../../../assets/js/test-utils/reusableTests/reducerTests";
import {
  setPrices,
  setLoginStatus,
  setUserId,
  setCoinNames,
  setCoinsRequestError,
  resetCoinsRequestError,
} from "../../actions";
import { defaultState, pricesReducer } from "./pricesReducer";
import {
  coinsObject,
  assembledCoinData,
  parsedCoins,
  coinsArray,
} from "./pricesReducerHelpers";

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
  coin1id: 9.99,
  coin2id: 0.98,
};

// mock of assembled coin data assembled from api requests
const coinsWithPricesArray = [
  { id: "coin1id", name: "coin1name", price: 9.99 },
  { id: "coin2id", name: "coin2name", price: 0.98 },
];

// mock of assembled coin data assembled from api requests
const coinsWithPricesObj = {
  coin1id: { name: "coin1name", price: 9.99 },
  coin2id: { name: "coin2name", price: 0.98 },
};

describe("pricesReducer", () => {
  it("returns the default state when undefined state provided", () => {
    expect(pricesReducer(undefined, {})).toEqual(defaultState);
  });

  describe("setCoinNames", () => {
    itMaintainsExistingState(pricesReducer, setCoinNames(coinNames));

    it("sets the coin names", () => {
      expect(pricesReducer(undefined, setCoinNames(coinNames))).toMatchObject({
        names: coinNames,
      });
    });

    it("updates assembledCoins when all other data exists", () => {
      expect(pricesReducer({ prices }, setCoinNames(coinNames))).toMatchObject({
        assembledCoins: coinsWithPricesObj,
      });
    });
  });

  describe("setPrices", () => {
    itMaintainsExistingState(pricesReducer, setPrices(prices));

    it("sets the coin prices", () => {
      expect(pricesReducer(undefined, setPrices(prices))).toMatchObject({
        prices: prices,
      });
    });

    it("updates assembledCoins when all other data exists", () => {
      expect(
        pricesReducer({ names: coinNames }, setPrices(prices))
      ).toMatchObject({
        assembledCoins: coinsWithPricesObj,
      });
    });
  });

  describe("setCoinsRequestError", () => {
    const errorStatus = true;

    itMaintainsExistingState(pricesReducer, setCoinsRequestError(errorStatus));
    it("sets the error status to the one given", () => {
      expect(
        pricesReducer(undefined, setCoinsRequestError(errorStatus))
      ).toMatchObject({
        errorStatus: errorStatus,
      });
    });
  });
});

describe("pricesReducerHelpers", () => {
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

    it("returns the combined coin data when all data is defined", () => {
      expect(assembledCoinData({ names: coinNames, prices })).toEqual(
        coinsWithPricesObj
      );
    });

    it("filters out coins that do not have prices", () => {
      expect(
        assembledCoinData({
          names: [...coinNames, { id: "nopriceid", name: "nopricename" }],
          prices,
        })
      ).toEqual(coinsWithPricesObj);
    });
  });

  describe("coinsArray", () => {
    it("converts the coins object to a coins array", () => {
      expect(coinsArray(coinsWithPricesObj)).toEqual(coinsWithPricesArray);
    });
  });
});

// describe("priceReducerHelpers", () => {
//   describe("assembledCoinData", () => {
//     it("adds the prices to the coins in coin array", () => {
//       expect(assembledCoinData(coinsObject(coinNames), prices)).toEqual({
//         coin1id: {
//           name: "coin1name",
//           price: prices.coin1id,
//         },
//         coin2id: {
//           name: "coin2name",
//           price: prices.coin2id,
//         },
//       });
//     });

//     it("does not do anything for prices whose id is not in coins object", () => {
//       const pricesWithUnusedId = {
//         ...prices,
//         unusedId: "999",
//       };
//       expect(
//         assembledCoinData(coinsObject(coinNames), pricesWithUnusedId)
//       ).toEqual({
//         coinsWithPricesArray,
//       });
//     });
//   });
// });
