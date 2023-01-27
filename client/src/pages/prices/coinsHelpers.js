// Create our number formatter.
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

/**
 *
 * @param {*} number
 * @returns Number in USD currency format
 */
export const toUSD = number => formatter.format(number);

/**
 *
 * @param {*} newValue
 * @param {*} initialValue
 * @returns Percent change from initial value to new value
 */
const percentChange = (newValue, initialValue) =>
  ((newValue - initialValue) / initialValue) * 100;

/**
 *
 * @param {*} coin Coin data object
 * @returns Percent change in coin price over 24h
 */
export const change24H = coin =>
  `${percentChange(coin.price, coin.stats.stats_24hour.open).toFixed(2)}%`;

export const toTrillions = number =>
  `${(number / Math.pow(10, 12)).toFixed(1)}T`;

export const toBillions = number => `${(number / Math.pow(10, 9)).toFixed(1)}B`;

export const toMillions = number => `${(number / Math.pow(10, 6)).toFixed(1)}M`;

export const toThousands = number =>
  `${(number / Math.pow(10, 3)).toFixed(1)}K`;

/**
 *
 * @param {*} number
 * @returns Number with less digits depending on its size.
 */
export const toLessDigits = number => {
  if (number > Math.pow(10, 12)) {
    return toTrillions(number);
  } else if (number > Math.pow(10, 9)) {
    return toBillions(number);
  } else if (number > Math.pow(10, 6)) {
    return toMillions(number);
  } else return toThousands(number);
};

export const toLessDigitsUSD = number => `$${toLessDigits(number)}`;

const volumeUSD = (volume, value) => volume * value;

/**
 *
 * @param {*} coin Coin data object
 * @returns Trading volume for coin over 24h in USD
 */
export const volume24H = coin =>
  `$${toBillions(volumeUSD(coin.stats.stats_24hour.volume, coin.price))}BN`;

export const formatPercent = percentValue => {
  return `${parseFloat(percentValue).toFixed(2)}%`;
};
