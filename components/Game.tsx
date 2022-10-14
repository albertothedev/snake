import { useSelector } from "react-redux";

import Loss from "components/Game/Loss";
import Board from "components/Game/Board";
import Start from "components/Game/Start";

import { RootState } from "redux/index";

const Game = (): JSX.Element => {
  const { gameState, score } = useSelector((state: RootState) => state);

  return (
    <div className="game">
      <div className="game__score">
        SCORE: <span>{score}</span>
      </div>

      <div className="game__board">
        {gameState === "waiting" && <Start />}

        {gameState === "playing" && <Board />}

        {gameState === "over" && <Loss />}
      </div>
    </div>
  );
};

export default Game;
