import React from "react";
import { Routes, Route } from "react-router-dom";
import { ConnectedHeader } from "./layouts/Header/ConnectedHeader";
import { ConnectedPrices } from "./pages/prices/ConnectedPrices";
import { Prices } from "./pages/prices/Prices";

export const App = () => (
  <div id="App">
    <ConnectedHeader />
    <Routes>
      <Route path="/" element={<ConnectedPrices />} />
    </Routes>
  </div>
);

export default App;
