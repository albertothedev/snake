import React, { useState, useEffect } from "react";

import Board from "./Game/Board";
import useInterval from "../utils/useInterval";
import { TCell, TSnake } from "../types/index";

const Game = (): JSX.Element => {
  const [gameState, setGameState] =
    useState<"waiting" | "playing" | "over">("waiting");
  const [board, setBoard] = useState<Array<TCell>>([]);
  const [snake, setSnake] = useState<TSnake>({
    head: 0,
    body: [],
    length: 5,
  });
  const [direction, _setDirection] = useState<{
    previous: "up" | "right" | "down" | "left" | null;
    current: "up" | "right" | "down" | "left";
  }>({
    previous: null,
    current: "down",
  });
  const boardDimensions: { rows: number; columns: number } = {
    rows: 25,
    columns: 40,
  };
  const boardCells: number = 1000;
  const gameSpeed: number = 150;
  const directionRef = React.useRef(direction);
  const setDirection = (data: any) => {
    directionRef.current = data;
    _setDirection(data);
  };

  useEffect((): void => {
    if (gameState !== "playing") {
      const boardTemp: Array<TCell> = [];

      for (let i = 0; i < boardCells; i++)
        boardTemp.push({
          id: `cell-${i}`,
          position: i,
          hasFood: false,
          hasSnake: false,
        });

      boardTemp[Math.floor(Math.random() * boardTemp.length)].hasFood = true;

      setBoard(boardTemp);
    }
    if (gameState === "playing")
      document.addEventListener("keydown", (e) => keyDown(e), false);
  }, [gameState]);

  useInterval(() => {
    if (gameState === "playing") moveSnake();
  }, gameSpeed);

  const keyDown = (e: any): void => {
    if (
      (e.key === "w" || e.key === "ArrowUp") &&
      directionRef.current.current !== "down" &&
      directionRef.current.current !== "up"
    )
      setDirection({
        previous: directionRef.current.current,
        current: "up",
      });
    else if (
      (e.key === "s" || e.key === "ArrowDown") &&
      directionRef.current.current !== "up" &&
      directionRef.current.current !== "down"
    )
      setDirection({
        previous: directionRef.current.current,
        current: "down",
      });
    else if (
      (e.key === "a" || e.key === "ArrowLeft") &&
      directionRef.current.current !== "right" &&
      directionRef.current.current !== "left"
    )
      setDirection({
        previous: directionRef.current.current,
        current: "left",
      });
    else if (
      (e.key === "d" || e.key === "ArrowRight") &&
      directionRef.current.current !== "left" &&
      directionRef.current.current !== "right"
    )
      setDirection({
        previous: directionRef.current.current,
        current: "right",
      });
  };

  const moveSnake = (): void => {
    let snakeTemp = { ...snake };

    let boardTemp = [...board];

    snakeTemp.body.unshift(snakeTemp.head);

    switch (directionRef.current.current) {
      case "up":
        if (snakeTemp.head < boardDimensions.columns)
          return setGameState("over");

        snakeTemp.head -= boardDimensions.columns;
        break;

      case "right":
        if (((snakeTemp.head + 1) / boardDimensions.columns) % 1 === 0)
          return setGameState("over");

        snakeTemp.head += 1;
        break;

      case "down":
        if (
          snakeTemp.head >=
          boardDimensions.rows * boardDimensions.columns -
            boardDimensions.columns
        )
          return setGameState("over");

        snakeTemp.head += boardDimensions.columns;
        break;

      case "left":
        if (
          ((snakeTemp.head + boardDimensions.columns) /
            boardDimensions.columns) %
            1 ===
          0
        )
          return setGameState("over");

        snakeTemp.head -= 1;
        break;
    }

    if (snakeTemp.body.length >= snakeTemp.length) {
      const position: any = snakeTemp.body.pop();
      boardTemp[position].hasSnake = false;
    }

    snakeTemp.body.forEach((position: number) => {
      if (position === snakeTemp.head) return setGameState("over");
    });

    if (boardTemp[snakeTemp.head].hasFood === true) {
      boardTemp[snakeTemp.head].hasFood = false;

      snakeTemp.length += 5;

      let randomCell = boardTemp[Math.floor(Math.random() * boardTemp.length)];

      while (randomCell.hasSnake)
        randomCell = boardTemp[Math.floor(Math.random() * boardTemp.length)];

      randomCell.hasFood = true;
    }

    [snakeTemp.head, snakeTemp.body]
      .flat()
      .forEach((position: number) => (boardTemp[position].hasSnake = true));

    setBoard(boardTemp);
    setSnake(snakeTemp);
  };

  const restartGame = (): void => {
    setDirection({
      previous: null,
      current: "down",
    });
    setSnake({
      head: 0,
      body: [],
      length: 5,
    });
    setGameState("playing");
  };

  return (
    <div className="game">
      <div className="game__score">
        SCORE: <span>{snake.length - 5}</span>
      </div>
      <Board
        gameState={gameState}
        setGameState={setGameState}
        board={board}
        restartGame={restartGame}
        score={snake.length - 5}
      />
    </div>
  );
};

export default Game;
