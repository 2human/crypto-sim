import { itMaintainsExistingState } from "../../../assets/js/test-utils/reusableTests/reducerTests";
import {
  setPrices,
  setLoginStatus,
  setUserId,
  setCoins,
  setCoinsRequestError,
} from "../../actions";
import { defaultState, pricesReducer } from "./pricesReducer";
import {
  coinsObject,
  coinsWithPrices,
  parsedCoins,
} from "./pricesReducerHelpers";

const coins = [
  { id: "coin1id", name: "coin1name", unusedProp: "unusedprop1" },
  { id: "coin2id", name: "coin2name", unusedProp: "unusedprop2" },
];

const prices = {
  coin1id: 9.99,
  coin2id: 0.98,
};

describe("pricesReducer", () => {
  it("returns the default state when undefined state provided", () => {
    expect(pricesReducer(undefined, {})).toEqual(defaultState);
  });

  describe("setCoins", () => {
    itMaintainsExistingState(pricesReducer, setCoins(coins));

    it("sets up the coin array", () => {
      expect(pricesReducer(undefined, setCoins(coins))).toMatchObject({
        coins: coinsObject(coins),
      });
    });

    it("sets the coin names", () => {
      expect(pricesReducer(undefined, setCoins(coins))).toMatchObject({
        names: coins,
      });
    });
  });

  describe("setPrices", () => {
    itMaintainsExistingState(pricesReducer, setPrices(prices));

    it("sets the coin prices", () => {
      expect(pricesReducer({ coins }, setPrices(prices))).toMatchObject({
        coins: coinsWithPrices(coins, prices),
      });
      expect(pricesReducer({ coins }, setPrices(prices))).toMatchObject({
        prices: prices,
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

describe("priceReducerHelpers", () => {
  describe("coinsObject", () => {
    it("turns the coins array into a coins object", () => {
      expect(coinsObject(coins)).toEqual({
        coin1id: {
          name: "coin1name",
        },
        coin2id: {
          name: "coin2name",
        },
      });
    });
  });

  describe("coinsWithPrices", () => {
    it("adds the prices to the coins in coin array", () => {
      expect(coinsWithPrices(coinsObject(coins), prices)).toEqual({
        coin1id: {
          name: "coin1name",
          price: prices.coin1id,
        },
        coin2id: {
          name: "coin2name",
          price: prices.coin2id,
        },
      });
    });

    it("does not do anything for prices whose id is not in coins object", () => {
      const pricesWithUnusedId = {
        ...prices,
        unusedId: "999",
      };
      expect(coinsWithPrices(coinsObject(coins), pricesWithUnusedId)).toEqual({
        coin1id: {
          name: "coin1name",
          price: prices.coin1id,
        },
        coin2id: {
          name: "coin2name",
          price: prices.coin2id,
        },
      });
    });
  });
});
