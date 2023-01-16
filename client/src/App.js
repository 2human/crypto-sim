import React from "react";
import { Routes, Route } from "react-router-dom";
import { ConnectedHeader } from "./layouts/Header/ConnectedHeader";
import { ConnectedCoins } from "./pages/prices/ConnectedCoins";
import { Prices } from "./pages/prices/Coins";

export const App = () => (
  <div id="App">
    <ConnectedHeader />
    <Routes>
      <Route path="/" element={<ConnectedCoins />} />
    </Routes>
  </div>
);

export default App;
