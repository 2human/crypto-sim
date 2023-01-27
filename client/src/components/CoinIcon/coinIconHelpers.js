export const iconPath = symbol => {
  symbol = symbol.toLowerCase();
  let fileName;
  try {
    fileName = require(`../../assets/images/${symbol}-icon.png`);
  } catch {
    fileName = "";
  }
  return fileName;
  // return require(`../../assets/images/${fileName}.png`);
};
