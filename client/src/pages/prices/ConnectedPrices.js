import { connect } from "react-redux";
import { updatePrices, getCoins } from "../../store/actions";
import { Prices } from "./Prices";
import { coinsArray } from "./pricesHelpers";

export const mapStateToProps = state => ({
  coins: coinsArray(state.prices.coins),
});

export const mapDispatchToProps = { updatePrices, getCoins };

export const ConnectedPrices = connect(
  mapStateToProps,
  mapDispatchToProps
)(Prices);
