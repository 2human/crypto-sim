import React from "react";
import { NavLink } from "react-router-dom";
import "whatwg-fetch";
import { createContainer } from "../../assets/js/test-utils/tools/domTools";
import {
  createConnectorShallowRenderer,
  createShallowRenderer,
  type,
} from "../../assets/js/test-utils/shallowDomTools";
import { Logo } from "../../components/Logo/Logo";
import { updateLoginStatus } from "../../store/actions";
import {
  ConnectedHeader,
  mapDispatchToProps,
  mapStateToProps,
} from "./ConnectedHeader";
import { Header } from "./Header";

describe("Header", () => {
  let renderWithRouter, element, elements;

  let shallowRender, elementMatching, elementsMatching;

  beforeEach(() => {
    ({ renderWithRouter, element, elements } = createContainer());
    ({ shallowRender, elementMatching, elementsMatching } =
      createShallowRenderer());
  });

  const render = component => renderWithRouter(component);

  it("renders the #header component", () => {
    render(<Header />);
    expect(element("#header")).not.toBeNull();
  });

  describe("logo", () => {
    it("renders the logo element", () => {
      render(<Header />);
      expect(element(".logo")).not.toBeNull();
    });

    it("renders a NavLink to / around the Logo image", () => {
      shallowRender(<Header />);
      const logoLink = elementsMatching(type(NavLink))[0];
      expect(logoLink).toBeDefined();
      expect(logoLink.props.to).toEqual("/");
      expect(logoLink.props.children.type).toEqual(Logo);
    });
  });

  describe("login btn", () => {
    it("is rendered by default", () => {
      render(<Header />);
      const loginBtn = element(".header__login-btn");
      expect(loginBtn).not.toBeNull();
      expect(loginBtn.textContent).toEqual("Login");
    });

    it("contains a link to the login path", () => {
      render(<Header />);
      expect(element(".header__login-btn").href).toContain("/auth/google");
    });

    it("is rendered when loggedIn is false", () => {
      render(<Header loggedIn={false} />);
      const loginBtn = element(".header__login-btn");
      expect(loginBtn).not.toBeNull();
    });

    it("is not rendered when loggedIn is true", () => {
      render(<Header loggedIn={true} />);
      const loginBtn = element(".header__login-btn");
      expect(loginBtn).toBeNull();
    });
  });

  describe("logout btn", () => {
    it("is not rendered when loggedIn is false", () => {
      render(<Header loggedIn={false} />);
      const logoutBtn = element(".header__logout-btn");
      expect(logoutBtn).toBeNull();
    });

    it("is rendered when loggedIn is true", () => {
      render(<Header loggedIn={true} />);
      const logoutBtn = element(".header__logout-btn");
      expect(logoutBtn).not.toBeNull();
    });

    it("is rendered when with the right text content", () => {
      render(<Header loggedIn={true} />);
      const logoutBtn = element(".header__logout-btn");
      expect(logoutBtn.textContent).toEqual("Logout");
    });

    it("contains a link to the logout path", () => {
      render(<Header loggedIn={true} />);
      const logoutBtn = element(".header__logout-btn");
      expect(logoutBtn.href).toContain("/api/logout");
    });

    it("calls updateLoginStatus when mounted", () => {
      let updateSpy = jest.fn();
      render(<Header updateLoginStatus={updateSpy} />);
      expect(updateSpy).toHaveBeenCalled();
    });
  });
});

describe("ConnectedHeader", () => {
  let shallowRenderConnector, connectedChild;

  const state = {
    auth: {
      loggedIn: "loggedin",
    },
  };

  beforeEach(() => {
    ({ shallowRenderConnector, connectedChild } =
      createConnectorShallowRenderer());
  });

  it("connects the SearchResults component", () => {
    shallowRenderConnector(<ConnectedHeader />);
    expect(connectedChild()).toEqual(Header);
  });

  it("maps the right state to props", () => {
    expect(mapStateToProps(state)).toMatchObject({
      loggedIn: state.auth.loggedIn,
    });
  });

  it("mapsStateToProps", () => {
    expect(mapStateToProps(state)).toMatchObject({
      loggedIn: state.auth.loggedIn,
    });
  });

  it("mapsDispatchToProps", () => {
    expect(mapDispatchToProps).toMatchObject({
      updateLoginStatus,
    });
  });
});
