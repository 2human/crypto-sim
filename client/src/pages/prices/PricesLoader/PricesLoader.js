import React, { useEffect, useState } from "react";
import { Prices } from "../Prices";
import {
  coinsArray,
  coinsObject,
  assembledCoinData,
} from "../../../store/reducers/priceReducer/pricesReducerHelpers";

export const PricesLoader = ({ assembleCoins, coinNames, prices }) => {
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
      <Prices coins={assembledCoins} />
    </div>
  );
};

PricesLoader.defaultProps = {
  assembleCoins: () => {},
  coinNames: null,
  prices: null,
};
