import React from "react";
import { itRendersTheComponent } from "../../../assets/js/test-utils/reusableTests/domTests";
import { createContainer } from "../../../assets/js/test-utils/tools/domTools";
import {
  createShallowRenderer,
  type,
} from "../../../assets/js/test-utils/tools/shallowDomTools";
import { Coins } from "../Coins";
import { CoinsLoader } from "./CoinsLoader";

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
const coinsWithCoinsArray = [
  { id: "coin1id", name: "coin1name", price: 9.99 },
  { id: "coin2id", name: "coin2name", price: 0.98 },
];

// mock of assembled coin data assembled from api requests
const coinsWithCoinsObj = {
  coin1id: { name: "coin1name", price: 9.99 },
  coin2id: { name: "coin2name", price: 0.98 },
};

describe("CoinsLoader", () => {
  let shallowRender, elementMatching, elementsMatching;
  let render, element, elements;

  beforeEach(() => {
    ({ render, element, elements } = createContainer());
    ({ shallowRender, elementMatching, elementsMatching } =
      createShallowRenderer());
  });

  itRendersTheComponent(<CoinsLoader />, Coins);

  it("initially renders Coins with an empty array as coins prop", () => {
    shallowRender(<CoinsLoader />);
    const CoinsComponent = elementMatching(type(Coins));
    expect(CoinsComponent).not.toBeNull();
    expect(CoinsComponent.props.coins).toEqual([]);
  });

  it("calls assembleCoins when mounted", () => {
    const assembleCoinSpy = jest.fn();
    render(<CoinsLoader assembleCoins={assembleCoinSpy} />);
    expect(assembleCoinSpy).toHaveBeenCalled();
  });
});
