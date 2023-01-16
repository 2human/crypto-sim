import React from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { CoinIcon } from "../../components/CoinIcon/CoinIcon";

const getPrices = async () => {
  const res = await fetch(
    "https://api.coinbase.com/v2/exchange-rates?currency=USD"
  );
  const prices = await res.json();
  // console.log(prices.data.rates);
};
export const Prices = ({ assembleCoins, coins }) => {
  useEffect(() => {
    assembleCoins();
  }, []);

  return (
    <div id="prices" className="prices">
      <Prices__Table>
        <Prices__THead>
          <Prices__TR>
            <Prices__TH>Name</Prices__TH>
            <Prices__TH>Price</Prices__TH>
            <Prices__TH>Change</Prices__TH>
            <Prices__TH>Market Cap</Prices__TH>
            <Prices__TH>Volume</Prices__TH>
            <Prices__TH>Supply</Prices__TH>
          </Prices__TR>
        </Prices__THead>
        <Prices__TBody>
          {coins.map((coin, i) => (
            <Prices__TR key={coin.name + " " + i}>
              <Prices__TD>
                <CoinIcon name={coin.name} />
                {coin.name}
              </Prices__TD>
              <Prices__TD>{coin.price}</Prices__TD>
              <Prices__TD>{coin.change}</Prices__TD>
              <Prices__TD>{coin.marketCap}</Prices__TD>
              <Prices__TD>{coin.volume}</Prices__TD>
              <Prices__TD>{coin.supply}</Prices__TD>
            </Prices__TR>
          ))}
        </Prices__TBody>
      </Prices__Table>
    </div>
  );
};

export const Prices__Table = ({ children }) => (
  <Table className="prices__table" hover>
    {children}
  </Table>
);

export const Prices__THead = ({ children }) => (
  <thead className="prices__thead">{children}</thead>
);

export const Prices__TR = ({ children }) => (
  <tr className="prices__tr">{children}</tr>
);

export const Prices__TH = ({ children }) => (
  <th className="prices__header">{children}</th>
);

export const Prices__TBody = ({ children }) => (
  <tbody className="prices__tbody">{children}</tbody>
);

export const Prices__TD = ({ children }) => (
  <td className="prices__td">{children}</td>
);

Prices.defaultProps = {
  coins: [
    {
      name: "Bitcoin",
      price: "$16685.23",
      change: "+5.21%",
      marketCap: "$1.5 bn",
      volume: "$56 mn",
      supply: "19.1 mn",
    },
    {
      name: "Ethereum",
      price: "$1105.12",
      change: "+3.21%",
      marketCap: "$723 mn",
      volume: "$13 mn",
      supply: "25 mn",
    },
  ],
  assembleCoins: () => {},
  coins: [],
};
