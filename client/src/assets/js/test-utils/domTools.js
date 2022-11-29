import ReactDOM from "react-dom/client";
import React from "react";
import ReactTestUtils, { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "../../../store";
import { storeSpy } from "expect-redux";

export const createContainer = () => {
  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`);
  const inputsOfType = inputType => elements(`input[type="${inputType}"]`);
  const container = document.createElement("div");
  const root = ReactDOM.createRoot(container);
  const element = selector => {
    return container.querySelector(selector);
  };
  const elements = selector => Array.from(container.querySelectorAll(selector));
  const form = id => container.querySelector(`form[id="${id}"]`);
  const field = (formId, name) => form(formId).elements[name];

  const simulateEvent = eventName => (element, eventData) =>
    ReactTestUtils.Simulate[eventName](element, eventData);

  const simulateEventAndWait = eventName => async (element, eventData) =>
    await act(async () =>
      ReactTestUtils.Simulate[eventName](element, eventData)
    );

  const store = configureStore([storeSpy]);

  return {
    render: component => act(() => root.render(component)),
    renderWithRouter: component =>
      act(() => root.render(<BrowserRouter>{component}</BrowserRouter>)),
    renderWithStore: component => {
      act(() => {
        root.render(<Provider store={store}>{component}</Provider>);
      });
    },
    renderWithStoreAndRouter: component => {
      act(() => {
        root.render(
          <Provider store={store}>
            <BrowserRouter>{component}</BrowserRouter>
          </Provider>
        );
      });
    },
    labelFor,
    inputsOfType,
    element,
    elements,
    click: simulateEvent("click"),
    dblClick: simulateEvent("doubleClick"),
    change: simulateEvent("change"),
    input: simulateEvent("input"),
    submit: simulateEventAndWait("submit"),
    keyDown: simulateEvent("keyDown"),
    keyPress: simulateEvent("keyPress"),
    field,
    form,
  };
};
