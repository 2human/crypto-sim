import React from "react";
import { createContainer } from "../../assets/js/test-utils/domTools";
import {
  childrenOf,
  createShallowRenderer,
  prop,
  type,
} from "../../assets/js/test-utils/shallowDomTools";
import { Prices } from "./Prices";

describe("", () => {
  let render, element, elements;

  let shallowRender, elementMatching, elementsMatching;

  beforeEach(() => {
    ({ render, element, elements } = createContainer());
    ({ shallowRender, elementMatching, elementsMatching } =
      createShallowRenderer());
  });

  it("renders the component", () => {
    render();
    expect(element("#App")).not.toBeNull();
  });
});
