import React from "react";
import "whatwg-fetch";
import { createContainer } from "../../assets/js/test-utils/tools/domTools";
import {
  childrenOf,
  createConnectorShallowRenderer,
  createShallowRenderer,
  prop,
  type,
} from "../../assets/js/test-utils/tools/shallowDomTools";
import {
  itRendersTheComponent,
  itRendersWithPropValue,
} from "../../assets/js/test-utils/reusableTests/domTests";
import { Prices, Prices__Table } from "./Prices";
import Table from "react-bootstrap/Table";
import {
  ConnectedPrices,
  mapDispatchToProps,
  mapStateToProps,
} from "./ConnectedPrices";
import { updatePrices, getCoins } from "../../store/actions";
import { coinsArray } from "./pricesHelpers";

describe("", () => {
  let render, element, elements;

  let shallowRender, elementMatching, elementsMatching;

  beforeEach(() => {
    ({ render, element, elements } = createContainer());
    ({ shallowRender, elementMatching, elementsMatching } =
      createShallowRenderer());
  });

  it("renders the #prices element", () => {
    render(<Prices />);
    expect(element("#prices")).not.toBeNull();
  });

  itRendersTheComponent(<Prices />, Prices__Table);

  describe("table", () => {
    itRendersTheComponent(<Prices__Table />, Table);
    itRendersWithPropValue(<Prices__Table />, Table, "hover", true);
    itRendersWithPropValue(
      <Prices__Table />,
      Table,
      "className",
      "prices__table"
    );
  });

  describe("thead", () => {
    it("renders the .prices__thead element", () => {
      render(<Prices />);
      expect(element(".prices__table .prices__thead")).not.toBeNull();
    });

    it("renders a tr element within the thead", () => {
      render(<Prices />);
      expect(element(".prices__table .prices__tr")).not.toBeNull();
    });

    it("renders each column header with the right text", () => {
      render(<Prices />);
      const headers = elements(".prices__tr .prices__header");
      expect(headers[0].textContent).toEqual("Name");
      expect(headers[1].textContent).toEqual("Price");
      expect(headers[2].textContent).toEqual("Change");
      expect(headers[3].textContent).toEqual("Market Cap");
      expect(headers[4].textContent).toEqual("Volume");
      expect(headers[5].textContent).toEqual("Supply");
    });
  });

  describe("tbody", () => {
    it("renders the tbody element", () => {
      render(<Prices />);
      expect(element(".prices__table .prices__tbody")).not.toBeNull();
    });

    const coins = [
      {
        name: "coin1name",
        price: "coin1price",
        change: "coin1change",
        marketCap: "coin1marketcap",
        volume: "coin1volume",
        supply: "coin1supply",
      },
      {
        name: "coin2name",
        price: "coin2price",
        change: "coin2change",
        marketCap: "coin2marketcap",
        volume: "coin2volume",
        supply: "coin2supply",
      },
    ];

    it("renders a table row for each coin object", () => {
      render(<Prices coins={coins} />);
      const coinRows = elements(".prices__tbody .prices__tr");
      expect(coinRows).not.toBeNull();
      expect(coinRows).toHaveLength(coins.length);
    });

    const firstRowDataCells = () =>
      elements(".prices__tbody .prices__tr:nth-child(1) .prices__td");
    const secondRowDataCells = () =>
      elements(".prices__tbody .prices__tr:nth-child(2) .prices__td");

    it("renders the right coin names in each row1", () => {
      render(<Prices coins={coins} />);
      expect(firstRowDataCells()[0].textContent).toEqual(coins[0].name);
      expect(secondRowDataCells()[0].textContent).toEqual(coins[1].name);
    });

    it("renders the right coin prices in each row", () => {
      render(<Prices coins={coins} />);
      expect(firstRowDataCells()[1].textContent).toEqual(coins[0].price);
      expect(secondRowDataCells()[1].textContent).toEqual(coins[1].price);
    });

    it("renders the right market caps in each row", () => {
      render(<Prices coins={coins} />);
      expect(firstRowDataCells()[3].textContent).toEqual(coins[0].marketCap);
      expect(secondRowDataCells()[3].textContent).toEqual(coins[1].marketCap);
    });

    it("renders the right change in each row", () => {
      render(<Prices coins={coins} />);
      expect(firstRowDataCells()[4].textContent).toEqual(coins[0].volume);
      expect(secondRowDataCells()[4].textContent).toEqual(coins[1].volume);
    });

    it("renders the right volume in each row", () => {
      render(<Prices coins={coins} />);
      expect(firstRowDataCells()[4].textContent).toEqual(coins[0].volume);
      expect(secondRowDataCells()[4].textContent).toEqual(coins[1].volume);
    });

    it("renders the right supply in each row", () => {
      render(<Prices coins={coins} />);
      expect(firstRowDataCells()[5].textContent).toEqual(coins[0].supply);
      expect(secondRowDataCells()[5].textContent).toEqual(coins[1].supply);
    });

    it("renders the .coin-icon element in the name cell", () => {
      render(<Prices coins={coins} />);
      const firstRowIcon = element(
        ".prices__tbody .prices__tr:nth-child(1) .prices__td .coin-icon"
      );
      const secondRowIcon = element(
        ".prices__tbody .prices__tr:nth-child(2) .prices__td .coin-icon"
      );
      expect(firstRowIcon).not.toBeNull();
      expect(secondRowIcon).not.toBeNull();
    });
  });

  it("calls getCoins when mounted", () => {
    const getCoinSpy = jest.fn();
    render(<Prices getCoins={getCoinSpy} />);
    expect(getCoinSpy).toHaveBeenCalled();
  });

  it("calls getCoins when mounted", () => {
    const updatePricesSpy = jest.fn();
    render(<Prices updatePrices={updatePricesSpy} />);
    expect(updatePricesSpy).toHaveBeenCalled();
  });
});

const coinsObject = {
  coin1id: {
    name: "coin1name",
    price: 998,
  },
  coin2id: {
    name: "coin2name",
    price: 999,
  },
};

describe("ConnectedPrices", () => {
  let shallowRenderConnector, connectedChild;

  const state = {
    prices: {
      prices: "prices",
      coins: coinsObject,
    },
  };

  beforeEach(() => {
    ({ shallowRenderConnector, connectedChild } =
      createConnectorShallowRenderer());
  });

  it("connects the SearchResults component", () => {
    shallowRenderConnector(<ConnectedPrices />);
    expect(connectedChild()).toEqual(Prices);
  });

  it("maps the right state to props", () => {
    expect(mapStateToProps(state)).toMatchObject({
      coins: coinsArray(coinsObject),
    });
  });

  it("mapsDispatchToProps", () => {
    expect(mapDispatchToProps).toMatchObject({
      updatePrices,
      getCoins,
    });
  });
});

describe("pricesHelpers", () => {
  describe("coinsArray", () => {
    it("returns the coins in array format", () => {
      expect(coinsArray(coinsObject)).toEqual([
        {
          id: "coin1id",
          ...coinsObject.coin1id,
        },
        {
          id: "coin2id",
          ...coinsObject.coin2id,
        },
      ]);
    });
  });
});
