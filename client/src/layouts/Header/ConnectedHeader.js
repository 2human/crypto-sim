import { connect } from "react-redux";
import { Header } from "./Header";
import { updateLoginStatus } from "../../store/actions";

export const mapStateToProps = (state, ownProps) => ({
  loggedIn: state.auth.loggedIn,
});

export const mapDispatchToProps = { updateLoginStatus };

export const ConnectedHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
