/**
 *
 * @param {*} coinsArray
 * @returns Coin data in object form.
 */
export const coinsObject = coinsArray => {
  const coinsObj = {};

  coinsArray.forEach(coin => (coinsObj[coin.id] = { name: coin.name }));

  return coinsObj;
};

const usdPerCoin = coinPerUSD => 1 / coinPerUSD;

const filteredCoinData = coinData => {
  let filteredData = {};

  Object.keys(coinData).forEach(id => {
    if (coinData[id].price) {
      filteredData[id] = { ...coinData[id] };
    }
  });

  return filteredData;
};

/**
 *
 * @param {*} object Object containing different types of coin data
 * @returns Objected with coin data joined together
 */
export const assembledCoinData = ({ names, prices }) => {
  //only perform operations if all data is present
  if (!names || !prices) {
    return null;
  }

  const coinData = coinsObject(names);

  Object.keys(prices).forEach(id => {
    if (coinData[id]) {
      //set price if there is a matching property
      coinData[id].price = usdPerCoin(prices[id]);
    }
  });

  //filter out coins with no prices
  return filteredCoinData(coinData);
};

/**
 *
 * @param {*} coinsObject Object containing coin data
 * @returns Array version of object
 */
export const coinsArray = coinsObject =>
  Object.keys(coinsObject).map(key => ({
    id: key,
    ...coinsObject[key],
  }));
