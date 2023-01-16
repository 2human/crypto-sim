import { connect } from "react-redux";
import { assembleCoins } from "../../store/actions";
import { Prices } from "./Prices";
import { coinsArray } from "../../store/reducers/priceReducer/pricesReducerHelpers";

export const mapStateToProps = state => ({
  coins: coinsArray(state.coins.assembledCoins),
});

export const mapDispatchToProps = { assembleCoins };

export const ConnectedPrices = connect(
  mapStateToProps,
  mapDispatchToProps
)(Prices);
