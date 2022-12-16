/**
 *
 * @param {*} coinsArray
 * @returns Coin data as an object.
 */
export const coinsObject = coinsArray => {
  const coinsObj = {};

  coinsArray.forEach(coin => (coinsObj[coin.id] = { name: coin.name }));

  return coinsObj;
};

export const coinsWithPrices = (coins, prices) => {
  if (!coins) return {}; //mostly for testing purposes
  Object.keys(prices).forEach(id => {
    if (coins[id]) {
      //set price if there is a matching property
      coins[id].price = prices[id];
    }
  });

  return coins;
};
