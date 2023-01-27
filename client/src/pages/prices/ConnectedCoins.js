import { connect } from "react-redux";
import { assembleCoins, getCoinData } from "../../store/actions";
import { Coins } from "./Coins";
import { coinsArray } from "../../store/reducers/coinsReducer/coinsReducerHelpers";

export const mapStateToProps = state => ({
  coins: state.coins.coins,
});

export const mapDispatchToProps = { getCoinData };

export const ConnectedCoins = connect(
  mapStateToProps,
  mapDispatchToProps
)(Coins);
