import Start from "./Board/Start";
import Loss from "./Board/Loss";
import Cell from "./Board/Cell";

type BoardProps = {
  gameState: "waiting" | "playing" | "over";
  setGameState: Function;
  board: Array<{
    id: string;
    position: number;
    hasFood: boolean;
    hasSnake: boolean;
  }>;
  restartGame: Function;
  score: number;
};

const Board = ({
  gameState,
  setGameState,
  board,
  restartGame,
  score,
}: BoardProps): JSX.Element => (
  <div className="board">
    {gameState === "waiting" && <Start setGameState={setGameState} />}

    {gameState === "playing" &&
      board.map(
        (cell: {
          id: string;
          position: number;
          hasFood: boolean;
          hasSnake: boolean;
        }) => <Cell key={cell.id} cell={cell} />
      )}

    {gameState === "over" && <Loss restartGame={restartGame} score={score} />}
  </div>
);

export default Board;
