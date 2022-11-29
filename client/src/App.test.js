import { AppBar } from "@mui/material";
import React from "react";
import { Routes } from "react-router-dom";
import { App } from "./App";
import { createContainer } from "./assets/js/test-utils/domTools";
import {
  childrenOf,
  createShallowRenderer,
  prop,
  type,
} from "./assets/js/test-utils/domToolsShallow";
import { ConnectedHeader } from "./layouts/Header/ConnectedHeader";
import { Header } from "./layouts/Header/Header";

describe("App", () => {
  let renderWithStoreAndRouter, element, elements;

  let shallowRender, elementMatching, elementsMatching;

  beforeEach(() => {
    ({ renderWithStoreAndRouter, element, elements } = createContainer());
    ({ shallowRender, elementMatching, elementsMatching } =
      createShallowRenderer());
  });

  const render = component => renderWithStoreAndRouter(component);

  const childRoutes = () => childrenOf(elementMatching(type(Routes)));
  const routeFor = path => childRoutes().find(prop("path", path));

  it("renders the #App component", () => {
    render(<App />);
    expect(element("#App")).not.toBeNull();
  });

  it("renders the Header by default", () => {
    shallowRender(<App />);
    expect(elementMatching(Header)).not.toBeNull();
  });

  it.skip("renders the Header by default", () => {
    shallowRender(<App />);
    expect(routeFor("/")).toBeDefined();
    expect(routeFor("/").props.element.type).toEqual(ConnectedHeader);
  });
});
