import { storeSpy, expectRedux } from "expect-redux";
import "whatwg-fetch";
import {
  fetchResponseError,
  fetchResponseOk,
} from "../../assets/js/test-utils/tools/spyHelpers";
import { configureStore } from "..";
import { setLoginStatus, setUserId, updateLoginStatus } from "../actions";

describe("updateLogin", () => {
  let store;
  const user = { _id: 123123 };

  beforeEach(() => {
    jest.spyOn(window, "fetch").mockReturnValue(fetchResponseOk(user));
    store = configureStore([storeSpy]);
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  const dispatchUpdate = data => store.dispatch(updateLoginStatus());

  it("submits a request to check login status", () => {
    dispatchUpdate();
    expect(window.fetch).toHaveBeenCalledWith("/api/current_user");
  });

  it("sets the user login status to true when user is logged in", () => {
    dispatchUpdate();
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(setLoginStatus(true));
  });

  it("updates the user id when the user is logged in", () => {
    dispatchUpdate();
    return expectRedux(store).toDispatchAnAction().matching(setUserId(user.id));
  });

  it("sets the user login status to false when the user is not logged in", () => {
    jest.spyOn(window, "fetch").mockReturnValue(fetchResponseOk(""));
    dispatchUpdate();
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(setLoginStatus(false));
  });

  it("sets the user id to undefined when the user is not logged in", () => {
    jest.spyOn(window, "fetch").mockReturnValue(fetchResponseOk(""));
    dispatchUpdate();
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(setUserId(undefined));
  });

  it("sets the user login status to false when there is an error", () => {
    jest.spyOn(window, "fetch").mockReturnValue(fetchResponseError());
    dispatchUpdate();
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(setLoginStatus(false));
  });

  it("sets the user id to undefined when there is an error", () => {
    jest.spyOn(window, "fetch").mockReturnValue(fetchResponseError());
    dispatchUpdate();
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(setUserId(undefined));
  });
});
