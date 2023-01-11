import { connect } from "react-redux";
import { updatePrices, getCoinNames, assembleCoins } from "../../store/actions";
import { Prices } from "./Prices";
import { coinsArray } from "./pricesHelpers";

export const mapStateToProps = state => ({
  coins: coinsArray(state.prices.coins),
});

export const mapDispatchToProps = { assembleCoins };

export const ConnectedPrices = connect(
  mapStateToProps,
  mapDispatchToProps
)(Prices);
