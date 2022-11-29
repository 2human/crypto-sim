import React from "react";
import {
  childrenOf,
  createShallowRenderer,
  prop,
  type,
} from "./test-utils/shallowHelpers";
import { createContainer } from "./assets/js/test-utils/domTools";

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
