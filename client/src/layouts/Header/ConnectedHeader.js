import { connect } from "react-redux";
import { Header } from "./Header";

export const mapStateToProps = (state, ownProps) => ({
  loggedIn: state.auth.loggedIn,
});

// export const mapDispatchToProps = {
//   searchRequest,
//   onGuideClick: openSearchGuide,
// };

export const ConnectedHeader = connect(mapStateToProps, {})(Header);
