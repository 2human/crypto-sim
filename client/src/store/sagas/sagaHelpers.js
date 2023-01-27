export const fetchUser = async () => await window.fetch("/api/current_user");

export const fetchCoinPrices = async () =>
  await window.fetch("https://api.coinbase.com/v2/exchange-rates?currency=USD");

export const fetchCoinNames = async () =>
  await window.fetch("https://api.pro.coinbase.com/currencies");

export const fetchCoinStats = async () =>
  await window.fetch("https://api.exchange.coinbase.com/products/stats");

export const fetchCoinData = async () =>
  await window.fetch("https://api.coincap.io/v2/assets");
