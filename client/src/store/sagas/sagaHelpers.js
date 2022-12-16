export const fetchUser = async () => await window.fetch("/api/current_user");

export const fetchPrices = async () =>
  await window.fetch("https://api.coinbase.com/v2/exchange-rates?currency=USD");

export const fetchCoins = async () =>
  await window.fetch("https://api.pro.coinbase.com/currencies");
