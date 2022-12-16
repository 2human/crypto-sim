/**
 *
 * @param {*} coinsObject
 * @returns Coins in array form.
 */
export const coinsArray = coinsObject => {
  return Object.keys(coinsObject).map(key => ({
    id: key,
    ...coinsObject[key],
  }));
};
