import React, { useEffect, useState } from "react";
import { Coins } from "../Coins";
import {
  coinsArray,
  coinsObject,
  assembledCoinData,
} from "../../../store/reducers/coinsReducer/coinsReducerHelpers";

export const CoinsLoader = ({ assembleCoins, coinNames, prices }) => {
  const [assembledCoins, setAssembledCoins] = useState([]);

  useEffect(() => {
    assembleCoins();
  }, []);

  const updateCoins = () => {
    let coinsWithPricesObject = assembledCoinData(
      coinsObject(coinNames, prices),
      prices
    );
    setAssembledCoins(coinsArray(coinsWithPricesObject));
    coinsArray(coinsWithPricesObject);
  };

  useEffect(() => {
    if (coinNames !== null && prices !== null) {
      console.log("updating");
      updateCoins();
    }
  }, [coinNames, prices]);

  return (
    <div>
      <Coins coins={assembledCoins} />
    </div>
  );
};

CoinsLoader.defaultProps = {
  assembleCoins: () => {},
  coinNames: null,
  prices: null,
};
