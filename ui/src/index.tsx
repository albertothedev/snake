import React from "react";
import { createRoot } from "react-dom/client";
import "normalize.css";
import { Provider } from "react-redux";

import store from "./redux";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import "./styles/main.scss";

const rootElement = document.getElementById("root");
if (rootElement === null) throw new Error("Root container missing in index.html");

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="app">
        <Game />
        <Leaderboard />
      </div>
    </Provider>
  </React.StrictMode>
);
