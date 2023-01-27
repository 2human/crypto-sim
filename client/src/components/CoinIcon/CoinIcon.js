import React from "react";
import { iconPath } from "./coinIconHelpers";
import "./CoinIcon.scss";

export const CoinIcon = ({ symbol }) => {
  return <img src={iconPath(symbol)} className="coin-icon" />;
};

CoinIcon.defaultProps = {
  symbol: "btc",
};
