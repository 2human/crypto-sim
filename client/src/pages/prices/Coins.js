import React from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { CoinIcon } from "../../components/CoinIcon/CoinIcon";
import {
  change24H,
  formatPercent,
  toLessDigits,
  toLessDigitsUSD,
  toUSD,
  volume24H,
} from "./coinsHelpers";
import "./Coins.scss";
import { Center } from "../../components/styling/Center/Center";

export const fetchCoinStats = async () =>
  await window.fetch("https://api.exchange.coinbase.com/products/stats");

export const Coins = ({ getCoinData, coins }) => {
  useEffect(() => {
    getCoinData();
  }, []);

  return (
    <div id="prices" className="coins">
      <Center>
        <Coins__Table>
          <Coins__ColGroup />
          <Coins__THead>
            <Coins__TR>
              <Coins__TH style={{ paddingLeft: "3rem" }}>Name</Coins__TH>
              <Coins__TH style={{ textAlign: "right" }}>Price</Coins__TH>
              <Coins__TH style={{ textAlign: "right" }}>Change (24h)</Coins__TH>
              <Coins__TH style={{ textAlign: "right" }}>Market Cap</Coins__TH>
              <Coins__TH style={{ textAlign: "right" }}>Volume</Coins__TH>
              <Coins__TH style={{ textAlign: "right" }}>Supply</Coins__TH>
              <Coins__TH style={{ textAlign: "right" }}>Trade</Coins__TH>
            </Coins__TR>
          </Coins__THead>
          <Coins__TBody>
            {coins.map((coin, i) => (
              <Coins__TR key={coin.name + " " + i}>
                <Coins__TD>
                  <CoinIcon symbol={coin.symbol} />
                  <Coins__Container>
                    <div>{coin.name}</div>
                    <div>{coin.symbol}</div>
                  </Coins__Container>
                </Coins__TD>
                <Coins__TD style={{ textAlign: "right" }}>
                  {toUSD(coin.priceUsd)}
                </Coins__TD>
                <Coins__TD style={{ textAlign: "right" }}>
                  {formatPercent(coin.changePercent24Hr)}
                </Coins__TD>
                <Coins__TD style={{ textAlign: "right" }}>
                  {toLessDigitsUSD(coin.marketCapUsd)}
                </Coins__TD>
                <Coins__TD style={{ textAlign: "right" }}>
                  {toLessDigitsUSD(coin.volumeUsd24Hr)}
                </Coins__TD>
                <Coins__TD style={{ textAlign: "right" }}>
                  {toLessDigits(coin.supply)}
                </Coins__TD>
                <Coins__TD style={{ textAlign: "right" }}>
                  <Button>Trade</Button>
                </Coins__TD>
              </Coins__TR>
            ))}
          </Coins__TBody>
        </Coins__Table>
      </Center>
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

export const Coins__Container = ({ children }) => (
  <span style={{ display: "inline-block", verticalAlign: "middle" }}>
    {children}
  </span>
);

export const Coins__TD = ({ children, style }) => (
  <td className="coins__td" style={style}>
    {children}
  </td>
);

Coins.defaultProps = {
  coins: [],
  getCoinData: () => {},
  coins: [],
};
