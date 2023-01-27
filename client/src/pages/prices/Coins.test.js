import React from "react";
import "whatwg-fetch";
import { createContainer } from "../../assets/js/test-utils/tools/domTools";
import {
  createConnectorShallowRenderer,
  createShallowRenderer,
} from "../../assets/js/test-utils/tools/shallowDomTools";
import {
  itRendersTheComponent,
  itRendersWithPropValue,
} from "../../assets/js/test-utils/reusableTests/domTests";
import Table from "react-bootstrap/Table";
import {
  ConnectedCoins,
  mapDispatchToProps,
  mapStateToProps,
} from "./ConnectedCoins";
import { getCoinData } from "../../store/actions";
import { coinsArray } from "../../store/reducers/coinsReducer/coinsReducerHelpers";
import {
  formatPercent,
  toBillions,
  toLessDigits,
  toLessDigitsUSD,
  toMillions,
  toThousands,
  toTrillions,
  toUSD,
} from "./coinsHelpers";
import { Coins, Coins__Table } from "./Coins";

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

  describe("colgroup", () => {
    it("renders the .coins__colgroup element", () => {
      render(<Coins />);
      expect(element(".coins__table colgroup.coins__colgroup")).not.toBeNull();
    });

    it("renders all the col elements", () => {
      render(<Coins />);
      expect(element(".coins__colgroup .coins__col--name")).not.toBeNull();
      expect(element(".coins__colgroup .coins__col--price")).not.toBeNull();
      expect(element(".coins__colgroup .coins__col--change")).not.toBeNull();
      expect(
        element(".coins__colgroup .coins__col--market-cap")
      ).not.toBeNull();
      expect(element(".coins__colgroup .coins__col--volume")).not.toBeNull();
      expect(element(".coins__colgroup .coins__col--supply")).not.toBeNull();
    });
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
      const headers = elements(".coins__tr .coins__th");
      expect(headers[0].textContent).toEqual("Name");
      expect(headers[1].textContent).toEqual("Price");
      expect(headers[2].textContent).toEqual("Change (24h)");
      expect(headers[3].textContent).toEqual("Market Cap");
      expect(headers[4].textContent).toEqual("Volume");
      expect(headers[5].textContent).toEqual("Supply");
      expect(headers[6].textContent).toEqual("Trade");
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
        price: 23300.12333,
        marketCap: "coin1marketcap",
        supply: "coin1supply",
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
      {
        name: "coin2name",
        price: 342.1123,
        marketCap: "coin2marketcap",
        supply: "coin2supply",
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
    ];

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

    it("renders a table row for each coin object", () => {
      render(<Coins coins={coinData} />);
      const coinRows = elements(".coins__tbody .coins__tr");
      expect(coinRows).not.toBeNull();
      expect(coinRows).toHaveLength(coinData.length);
    });

    const firstRowDataCells = () =>
      elements(".coins__tbody .coins__tr:nth-child(1) .coins__td");
    const secondRowDataCells = () =>
      elements(".coins__tbody .coins__tr:nth-child(2) .coins__td");

    it("renders the right coin names in each row", () => {
      render(<Coins coins={coinData} />);
      expect(firstRowDataCells()[0].textContent).toContain(coinData[0].name);
      expect(secondRowDataCells()[0].textContent).toContain(coinData[1].name);
    });

    it("renders the right coin symbols in each row", () => {
      render(<Coins coins={coinData} />);
      expect(firstRowDataCells()[0].textContent).toContain(coinData[0].symbol);
      expect(secondRowDataCells()[0].textContent).toContain(coinData[1].symbol);
    });

    it("renders the right coin prices in each row", () => {
      render(<Coins coins={coinData} />);
      expect(firstRowDataCells()[1].textContent).toEqual(
        toUSD(coinData[0].priceUsd)
      );
      expect(secondRowDataCells()[1].textContent).toEqual(
        toUSD(coinData[1].priceUsd)
      );
    });

    it("renders the right change in each row", () => {
      render(<Coins coins={coinData} />);
      expect(firstRowDataCells()[2].textContent).toEqual(
        formatPercent(coinData[0].changePercent24Hr)
      );
      expect(secondRowDataCells()[2].textContent).toEqual(
        formatPercent(coinData[1].changePercent24Hr)
      );
    });

    it("renders the right market caps in each row", () => {
      render(<Coins coins={coinData} />);
      expect(firstRowDataCells()[3].textContent).toEqual(
        toLessDigitsUSD(coinData[0].marketCapUsd)
      );
      expect(secondRowDataCells()[3].textContent).toEqual(
        toLessDigitsUSD(coinData[1].marketCapUsd)
      );
    });

    it("renders the right volume in each row ", () => {
      render(<Coins coins={coinData} />);
      expect(firstRowDataCells()[4].textContent).toEqual(
        toLessDigitsUSD(coinData[0].volumeUsd24Hr)
      );
      expect(secondRowDataCells()[4].textContent).toEqual(
        toLessDigitsUSD(coinData[1].volumeUsd24Hr)
      );
    });

    it("renders the right supply in each row", () => {
      render(<Coins coins={coinData} />);
      expect(firstRowDataCells()[5].textContent).toEqual(
        toLessDigits(coinData[0].supply)
      );
      expect(secondRowDataCells()[5].textContent).toEqual(
        toLessDigits(coinData[1].supply)
      );
    });

    it("renders a Trade button in each row", () => {
      render(<Coins coins={coinData} />);
    });

    it("renders the .coin-icon element in the name cell", () => {
      render(<Coins coins={coinData} />);
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

  it("calls getCoinsData when mounted", () => {
    const getCoinDataaSpy = jest.fn();
    render(<Coins getCoinData={getCoinDataaSpy} />);
    expect(getCoinDataaSpy).toHaveBeenCalled();
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
      coins: "coinsarray",
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
      coins: state.coins.coins,
    });
  });

  it("mapsDispatchToProps", () => {
    expect(mapDispatchToProps).toMatchObject({
      getCoinData,
    });
  });
});

describe("coinsHelpers", () => {
  describe("toTrillions", () => {
    it("converts the value to trillions to one decimal place", () => {
      expect(toTrillions(25540000000000)).toEqual("25.5T");
    });
  });

  describe("toBillions", () => {
    it("converts the value to billions to one decimal place", () => {
      expect(toBillions(25540000000)).toEqual("25.5B");
    });
  });

  describe("toMillions", () => {
    it("converts the value to millions to one decimal place", () => {
      expect(toMillions(25540000)).toEqual("25.5M");
    });
  });

  describe("toThousands", () => {
    it("converts the value to thousands to one decimal place", () => {
      expect(toThousands(25540)).toEqual("25.5K");
    });
  });

  describe("toLessDigits", () => {
    it("returns in trillions when greater than a trillion", () => {
      expect(toLessDigits(25540000000000)).toEqual("25.5T");
    });

    it("returns in billions when greater than a billion", () => {
      expect(toLessDigits(25540000000)).toEqual("25.5B");
    });

    it("returns in millions when greater than a million", () => {
      expect(toLessDigits(25540000)).toEqual("25.5M");
    });

    it("returns in thousands when less than a million", () => {
      expect(toLessDigits(25540)).toEqual("25.5K");
    });
  });

  describe("toLessDigits", () => {
    it("appends a dollar sign to the toLessDigits value", () => {
      expect(toLessDigitsUSD(25540)).toEqual(`$25.5K`);
    });
  });

  describe("formatPercent", () => {
    it("returns the percent to two decimal places with a percent sign", () => {
      expect(formatPercent("-5.4432")).toEqual("-5.44%");
    });
  });
});
