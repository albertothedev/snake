import { useState } from "react";

type StartProps = {
  setGameState: Function;
};

const Start = ({ setGameState }: StartProps): JSX.Element => {
  const [blinking, setBlinking] = useState<boolean>(true);

  return (
    <div className="start">
      <h1 className="start__title">SNAKE GAME</h1>
      <div className="start__logo">
        {Array.from(Array(12), (e, i) => (
          <div
            key={i}
            className={`start__logo__cell ${
              i <= 9 ? "start__logo__cell--dark" : ""
            } ${i === 11 ? " start__logo__cell--food" : ""}`}
          >
            {i === 11 &&
              Array.from(Array(9), (e, i) => (
                <div className={`${i % 2 !== 0 ? "dark" : ""}`} key={i}></div>
              ))}
          </div>
        ))}
      </div>
      <h2 className="start__controls">USE WASD OR CONTROL KEYS TO MOVE</h2>
      <button
        className={`start__startButton ${
          blinking ? "start__startButton--blink" : ""
        }`}
        onClick={() => setGameState("playing")}
        onMouseOver={() => setBlinking(false)}
        onMouseOut={() => setBlinking(true)}
      >
        START
      </button>
    </div>
  );
};

export default Start;
