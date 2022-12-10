import React from "react";
import { Routes } from "react-router-dom";
import "whatwg-fetch";
import { App } from "./App";
import { createContainer } from "./assets/js/test-utils/tools/domTools";
import {
  childrenOf,
  createShallowRenderer,
  id,
  prop,
  type,
} from "./assets/js/test-utils/tools/shallowDomTools";
import { ConnectedHeader } from "./layouts/Header/ConnectedHeader";
import { Prices } from "./pages/prices/Prices";

describe("App", () => {
  let shallowRender, elementMatching, elementsMatching;

  beforeEach(() => {
    ({ shallowRender, elementMatching, elementsMatching } =
      createShallowRenderer());
  });

  const childRoutes = () => childrenOf(elementMatching(type(Routes)));
  const routeFor = path => childRoutes().find(prop("path", path));

  it("renders the #App component", () => {
    shallowRender(<App />);
    expect(elementMatching(id("App"))).toBeDefined();
  });

  it("renders the Header by default", () => {
    shallowRender(<App />);
    expect(elementMatching(type(ConnectedHeader))).toBeDefined();
  });

  it("renders the Header by default", () => {
    shallowRender(<App />);
    expect(routeFor("/")).toBeDefined();
    expect(routeFor("/").props.element.type).toEqual(Prices);
  });
});
