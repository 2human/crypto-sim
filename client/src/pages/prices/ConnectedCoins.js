import { connect } from "react-redux";
import { assembleCoins } from "../../store/actions";
import { Coins } from "./Coins";
import { coinsArray } from "../../store/reducers/coinsReducer/coinsReducerHelpers";

export const mapStateToProps = state => ({
  coins: coinsArray(state.coins.assembledCoins),
});

export const mapDispatchToProps = { assembleCoins };

export const ConnectedCoins = connect(
  mapStateToProps,
  mapDispatchToProps
)(Coins);
