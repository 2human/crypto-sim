import React from "react";
import { iconPath } from "./coinIconHelpers";
import "./CoinIcon.scss";

export const CoinIcon = ({ name }) => {
  return <img src={iconPath(name)} className="coin-icon" />;
};

CoinIcon.defaultProps = {
  name: "Bitcoin",
};
