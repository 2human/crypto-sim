export const itReturnsTheRightObject = (action, object) => {
  it("the action returns the right object", () => {
    expect(action).toMatchObject(object);
  });
};
