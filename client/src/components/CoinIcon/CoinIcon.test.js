import React from "react";
import { createContainer } from "../../assets/js/test-utils/tools/domTools";
import {
  className,
  createShallowRenderer,
} from "../../assets/js/test-utils/tools/shallowDomTools";
import { CoinIcon } from "./CoinIcon";

describe("", () => {
  let render, element, elements;

  let shallowRender, elementMatching, elementsMatching;

  beforeEach(() => {
    ({ render, element, elements } = createContainer());
    ({ shallowRender, elementMatching } = createShallowRenderer());
  });

  it("renders the component", () => {
    render(<CoinIcon />);
    expect(element("img.coin-icon")).not.toBeNull();
  });
});
