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

/**
 *
 * @param {*} coinPerUSD Value of coin per usd
 * @returns Value of USD per coin
 */
const usdPerCoin = coinPerUSD => 1 / coinPerUSD;

/**
 *
 * @param {*} coinData Object containing coin data
 * @returns Coin data not including those without prices
 */
const noPricesCoinDataFiltered = coinData => {
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
 * @param {*} coinData Object containing coin data
 * @returns Coin data not including those without stats.
 */
const noStatsCoinDataFiltered = coinData => {
  let filteredData = {};

  Object.keys(coinData).forEach(id => {
    if (coinData[id].stats) {
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
export const assembledCoinData = ({ names, prices, stats }) => {
  //only perform operations if all data is present
  if (!names || !prices || !stats) {
    return null;
  }

  let coinData = coinsObject(names); //coin names are originally in array form

  Object.keys(prices).forEach(id => {
    if (coinData[id]) {
      //set price if there is a matching property
      coinData[id].price = usdPerCoin(prices[id]);
      coinData[id].stats = stats[`${id}-USD`];
    }
  });

  //filter out coins with no prices
  coinData = noPricesCoinDataFiltered(coinData);
  //filter out coins with no stats
  coinData = noStatsCoinDataFiltered(coinData);

  return coinData;
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
