import React, { useEffect } from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";

import { Logo } from "../../components/Logo/Logo";
import { Navbar, Container, Button } from "react-bootstrap";

export const Header = ({ loggedIn, updateLoginStatus }) => {
  useEffect(() => {
    updateLoginStatus();
  }, []);

  return (
    <Navbar id="header" className="header" bg="white">
      <Container>
        <NavLink to="/" className="header__nav-link">
          <Logo />
        </NavLink>
        {loggedIn ? <Header__LogoutBtn /> : <Header__LoginBtn />}
      </Container>
    </Navbar>
  );
};

const Header__LogoutBtn = () => (
  <Button className="header__logout-btn" href="/api/logout">
    Logout
  </Button>
);

const Header__LoginBtn = () => (
  <Button className="header__login-btn" href="/auth/google">
    Login
  </Button>
);
Header.defaultProps = {
  loggedIn: false,
  updateLoginStatus: () => {},
};
