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
import { Coins, Coins__Table } from "./Coins";
import Table from "react-bootstrap/Table";
import {
  ConnectedCoins,
  mapDispatchToProps,
  mapStateToProps,
} from "./ConnectedCoins";
import { updateCoins, getCoinNames, assembleCoins } from "../../store/actions";
import { CoinsLoader } from "./CoinsLoader/CoinsLoader";
import { coinsArray } from "../../store/reducers/coinsReducer/coinsReducerHelpers";

describe("Coins", () => {
  let render, element, elements;

  let shallowRender, elementMatching, elementsMatching;

  beforeEach(() => {
    ({ render, element, elements } = createContainer());
    ({ shallowRender, elementMatching, elementsMatching } =
      createShallowRenderer());
  });

  it("renders the #prices element", () => {
    render(<Coins />);
    expect(element("#prices")).not.toBeNull();
  });

  itRendersTheComponent(<Coins />, Coins__Table);

  describe("table", () => {
    itRendersTheComponent(<Coins__Table />, Table);
    itRendersWithPropValue(<Coins__Table />, Table, "hover", true);
    itRendersWithPropValue(
      <Coins__Table />,
      Table,
      "className",
      "coins__table"
    );
  });

  describe("thead", () => {
    it("renders the .coins__thead element", () => {
      render(<Coins />);
      expect(element(".coins__table .coins__thead")).not.toBeNull();
    });

    it("renders a tr element within the thead", () => {
      render(<Coins />);
      expect(element(".coins__table .coins__tr")).not.toBeNull();
    });

    it("renders each column header with the right text", () => {
      render(<Coins />);
      const headers = elements(".coins__tr .coins__header");
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
      render(<Coins />);
      expect(element(".coins__table .coins__tbody")).not.toBeNull();
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
      render(<Coins coins={coins} />);
      const coinRows = elements(".coins__tbody .coins__tr");
      expect(coinRows).not.toBeNull();
      expect(coinRows).toHaveLength(coins.length);
    });

    const firstRowDataCells = () =>
      elements(".coins__tbody .coins__tr:nth-child(1) .coins__td");
    const secondRowDataCells = () =>
      elements(".coins__tbody .coins__tr:nth-child(2) .coins__td");

    it("renders the right coin names in each row1", () => {
      render(<Coins coins={coins} />);
      expect(firstRowDataCells()[0].textContent).toEqual(coins[0].name);
      expect(secondRowDataCells()[0].textContent).toEqual(coins[1].name);
    });

    it("renders the right coin prices in each row", () => {
      render(<Coins coins={coins} />);
      expect(firstRowDataCells()[1].textContent).toEqual(coins[0].price);
      expect(secondRowDataCells()[1].textContent).toEqual(coins[1].price);
    });

    it("renders the right market caps in each row", () => {
      render(<Coins coins={coins} />);
      expect(firstRowDataCells()[3].textContent).toEqual(coins[0].marketCap);
      expect(secondRowDataCells()[3].textContent).toEqual(coins[1].marketCap);
    });

    it("renders the right change in each row", () => {
      render(<Coins coins={coins} />);
      expect(firstRowDataCells()[4].textContent).toEqual(coins[0].volume);
      expect(secondRowDataCells()[4].textContent).toEqual(coins[1].volume);
    });

    it("renders the right volume in each row", () => {
      render(<Coins coins={coins} />);
      expect(firstRowDataCells()[4].textContent).toEqual(coins[0].volume);
      expect(secondRowDataCells()[4].textContent).toEqual(coins[1].volume);
    });

    it("renders the right supply in each row", () => {
      render(<Coins coins={coins} />);
      expect(firstRowDataCells()[5].textContent).toEqual(coins[0].supply);
      expect(secondRowDataCells()[5].textContent).toEqual(coins[1].supply);
    });

    it("renders the .coin-icon element in the name cell", () => {
      render(<Coins coins={coins} />);
      const firstRowIcon = element(
        ".coins__tbody .coins__tr:nth-child(1) .coins__td .coin-icon"
      );
      const secondRowIcon = element(
        ".coins__tbody .coins__tr:nth-child(2) .coins__td .coin-icon"
      );
      expect(firstRowIcon).not.toBeNull();
      expect(secondRowIcon).not.toBeNull();
    });
  });

  it("calls getCoinNames when mounted", () => {
    const assembleCoinSpy = jest.fn();
    render(<Coins assembleCoins={assembleCoinSpy} />);
    expect(assembleCoinSpy).toHaveBeenCalled();
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

describe("ConnectedCoins", () => {
  let shallowRenderConnector, connectedChild;

  const state = {
    coins: {
      assembledCoins: "assembledCoins",
    },
  };

  beforeEach(() => {
    ({ shallowRenderConnector, connectedChild } =
      createConnectorShallowRenderer());
  });

  it("connects the SearchResults component", () => {
    shallowRenderConnector(<ConnectedCoins />);
    expect(connectedChild()).toEqual(Coins);
  });

  it("maps the right state to props", () => {
    expect(mapStateToProps(state)).toMatchObject({
      coins: coinsArray(state.coins.assembledCoins),
    });
  });

  it("mapsDispatchToProps", () => {
    expect(mapDispatchToProps).toMatchObject({
      assembleCoins,
    });
  });
});
