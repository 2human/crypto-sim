import React from "react";
import { Routes, Route } from "react-router-dom";
import { ConnectedHeader } from "./layouts/Header/ConnectedHeader";
import { Prices } from "./pages/prices/Prices";

const coins = [
  {
    name: "Bitcoin",
    price: "$16685.23",
    change: "+5.21%",
    marketCap: "$1.5 bn",
    volume: "$56 mn",
    supply: "19.1 mn",
  },
  {
    name: "Ethereum",
    price: "$1105.12",
    change: "+3.21%",
    marketCap: "$723 mn",
    volume: "$13 mn",
    supply: "25 mn",
  },
];

export const App = () => (
  <div id="App">
    <ConnectedHeader />
    <Routes>
      <Route path="/" element={<Prices coins={coins} />} />
    </Routes>
  </div>
);

export default App;
