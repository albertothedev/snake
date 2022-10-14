import { useState } from "react";
import { useDispatch } from "react-redux";

import { setGameState } from "redux/index";

export default function Start() {
  const dispatch = useDispatch();

  const [blinking, setBlinking] = useState<boolean>(true);

  return (
    <div className="game__board__start">
      <h1 className="game__board__start__title">SNAKE GAME</h1>
      <div className="game__board__start__logo">
        {Array.from(Array(12), (_, index) => (
          <div
            key={index}
            className={`game__board__start__logo__cell${
              index <= 9 ? " game__board__start__logo__cell--dark" : ""
            }${index === 11 ? " game__board__start__logo__cell--food" : ""}`}
          >
            {index === 11 &&
              Array.from(Array(9), (_, index) => (
                <div
                  className={`${index % 2 !== 0 ? "dark" : ""}`}
                  key={index}
                ></div>
              ))}
          </div>
        ))}
      </div>
      <h2 className="game__board__start__info">
        USE WASD OR CONTROL KEYS TO MOVE
      </h2>
      <button
        className={`game__board__start__startButton ${
          blinking ? "game__board__start__startButton--blink" : ""
        }`}
        onClick={() => dispatch(setGameState("playing"))}
        onMouseOver={() => setBlinking(false)}
        onFocus={() => setBlinking(false)}
        onMouseOut={() => setBlinking(true)}
        onBlur={() => setBlinking(true)}
      >
        START
      </button>
    </div>
  );
}
