export const iconPath = coinName => {
  let fileName;
  switch (coinName) {
    case "Bitcoin":
      fileName = "btc-icon";
      break;
    case "Ethereum":
      fileName = "eth-icon";
      break;
    default:
      return "";
  }
  return require(`../../assets/images/${fileName}.png`);
};
