import React from "react";
import { itRendersTheComponent } from "../../../assets/js/test-utils/reusableTests/domTests";
import { createContainer } from "../../../assets/js/test-utils/tools/domTools";
import {
  createShallowRenderer,
  type,
} from "../../../assets/js/test-utils/tools/shallowDomTools";
import { Prices } from "../Prices";
import { PricesLoader } from "./PricesLoader";
import {
  coinsArray,
  coinsObject,
  assembledCoinData,
} from "../../../store/reducers/priceReducer/pricesReducerHelpers";

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

describe("PricesLoader", () => {
  let shallowRender, elementMatching, elementsMatching;
  let render, element, elements;

  beforeEach(() => {
    ({ render, element, elements } = createContainer());
    ({ shallowRender, elementMatching, elementsMatching } =
      createShallowRenderer());
  });

  itRendersTheComponent(<PricesLoader />, Prices);

  it("initially renders Prices with an empty array as coins prop", () => {
    shallowRender(<PricesLoader />);
    const PricesComponent = elementMatching(type(Prices));
    expect(PricesComponent).not.toBeNull();
    expect(PricesComponent.props.coins).toEqual([]);
  });

  it("calls assembleCoins when mounted", () => {
    const assembleCoinSpy = jest.fn();
    render(<PricesLoader assembleCoins={assembleCoinSpy} />);
    expect(assembleCoinSpy).toHaveBeenCalled();
  });

  // const flushPromises = () => {
  //   return new Promise(resolve => setImmediate(resolve));
  // };

  it.skip("passes the assembled coins array to the Prices prop when data is loaded", async () => {
    shallowRender(<PricesLoader coinNames={coinNames} prices={prices} />);
    // setTimeout(() => {}, 5000);
    const PricesComponent = elementMatching(type(Prices));
    expect(PricesComponent).not.toBeNull();
    expect(PricesComponent.props.coins).toEqual(coinsWithPricesArray);
  });
});
