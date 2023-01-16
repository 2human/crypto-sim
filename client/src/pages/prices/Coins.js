import React from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { CoinIcon } from "../../components/CoinIcon/CoinIcon";

export const Coins = ({ assembleCoins, coins }) => {
  useEffect(() => {
    assembleCoins();
  }, []);

  return (
    <div id="prices" className="prices">
      <Coins__Table>
        <Coins__THead>
          <Coins__TR>
            <Coins__TH>Name</Coins__TH>
            <Coins__TH>Price</Coins__TH>
            <Coins__TH>Change</Coins__TH>
            <Coins__TH>Market Cap</Coins__TH>
            <Coins__TH>Volume</Coins__TH>
            <Coins__TH>Supply</Coins__TH>
          </Coins__TR>
        </Coins__THead>
        <Coins__TBody>
          {coins.map((coin, i) => (
            <Coins__TR key={coin.name + " " + i}>
              <Coins__TD>
                <CoinIcon name={coin.name} />
                {coin.name}
              </Coins__TD>
              <Coins__TD>{coin.price}</Coins__TD>
              <Coins__TD>{coin.change}</Coins__TD>
              <Coins__TD>{coin.marketCap}</Coins__TD>
              <Coins__TD>{coin.volume}</Coins__TD>
              <Coins__TD>{coin.supply}</Coins__TD>
            </Coins__TR>
          ))}
        </Coins__TBody>
      </Coins__Table>
    </div>
  );
};

export const Coins__Table = ({ children }) => (
  <Table className="coins__table" hover>
    {children}
  </Table>
);

export const Coins__THead = ({ children }) => (
  <thead className="coins__thead">{children}</thead>
);

export const Coins__TR = ({ children }) => (
  <tr className="coins__tr">{children}</tr>
);

export const Coins__TH = ({ children }) => (
  <th className="coins__header">{children}</th>
);

export const Coins__TBody = ({ children }) => (
  <tbody className="coins__tbody">{children}</tbody>
);

export const Coins__TD = ({ children }) => (
  <td className="coins__td">{children}</td>
);

Coins.defaultProps = {
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
