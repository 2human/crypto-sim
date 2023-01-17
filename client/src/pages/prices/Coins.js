import React from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { CoinIcon } from "../../components/CoinIcon/CoinIcon";
import { toUSD } from "./coinsHelpers";
import "./Coins.scss";

export const fetchCoinStats = async () =>
  await window.fetch("https://api.exchange.coinbase.com/products/stats");

const coinStats = async () => {
  const result = await fetchCoinStats();
  const stats = await result.json();
  console.log(stats);
};

export const Coins = ({ assembleCoins, coins }) => {
  useEffect(() => {
    assembleCoins();
    // coinStats();
  }, []);

  return (
    <div id="prices" className="prices">
      <Coins__Table>
        <Coins__ColGroup />
        <Coins__THead>
          <Coins__TR>
            <Coins__TH style={{ paddingLeft: "3rem" }}>Name</Coins__TH>
            <Coins__TH style={{ textAlign: "right" }}>Price</Coins__TH>
            <Coins__TH style={{ textAlign: "right" }}>Change</Coins__TH>
            <Coins__TH style={{ textAlign: "right" }}>Market Cap</Coins__TH>
            <Coins__TH style={{ textAlign: "right" }}>Volume</Coins__TH>
            <Coins__TH style={{ textAlign: "right" }}>Supply</Coins__TH>
          </Coins__TR>
        </Coins__THead>
        <Coins__TBody>
          {coins.map((coin, i) => (
            <Coins__TR key={coin.name + " " + i}>
              <Coins__TD>
                <CoinIcon name={coin.name} />
                {coin.name}
              </Coins__TD>
              <Coins__TD style={{ textAlign: "right" }}>
                {toUSD(coin.price)}
              </Coins__TD>
              <Coins__TD style={{ textAlign: "right" }}>
                {coin.change}
              </Coins__TD>
              <Coins__TD style={{ textAlign: "right" }}>
                {coin.marketCap}
              </Coins__TD>
              <Coins__TD style={{ textAlign: "right" }}>
                {coin.volume}
              </Coins__TD>
              <Coins__TD style={{ textAlign: "right" }}>
                {coin.supply}
              </Coins__TD>
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

export const Coins__ColGroup = () => (
  <colgroup className="coins__colgroup">
    <col className="coins__col--name" />
    <col className="coins__col--price" />
    <col className="coins__col--change" />
    <col className="coins__col--change" />
    <col className="coins__col--market-cap" />
    <col className="coins__col--volume" />
    <col className="coins__col--supply" />
  </colgroup>
);

export const Coins__THead = ({ children }) => (
  <thead className="coins__thead">{children}</thead>
);

export const Coins__TR = ({ children }) => (
  <tr className="coins__tr">{children}</tr>
);

export const Coins__TH = ({ children, textAlign, style }) => {
  return (
    <th
      className={`coins__th ${
        textAlign ? `coins__th--align-${textAlign}` : ""
      }`}
      style={style}
    >
      {children}
    </th>
  );
};

export const Coins__TBody = ({ children }) => (
  <tbody className="coins__tbody">{children}</tbody>
);

export const Coins__TD = ({ children, style }) => (
  <td className="coins__td" style={style}>
    {children}
  </td>
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
