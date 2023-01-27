import React from "react";

export const TextAlign = ({ children, align }) => (
  <div style={{ textAlign: align }}>{children}</div>
);

TextAlign.defaultProps = {
  align: "left",
};
