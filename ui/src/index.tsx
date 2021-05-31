import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import { Provider } from "react-redux";

import store from "./redux";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import "./styles/main.scss";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="app">
        <Game />
        <Leaderboard />
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
