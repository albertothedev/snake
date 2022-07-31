import React, { useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";

import useInterval from "utils/useInterval";
import { TCell, TSnake } from "types/index";
import { setDataFetched, setRequestType, setPlayerBest } from "../redux";

const Game = (): JSX.Element => {
  const dispatch = useDispatch();

  const [gameState, setGameState] = useState<"waiting" | "playing" | "over">(
    "waiting"
  );
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

  const [blinking, setBlinking] = useState<boolean>(true);

  const [value, setValue] = useState<string>("");
  const [submitBlinking, setSubmitBlinking] = useState<boolean>(true);
  const [restartBlinking, setRestartBlinking] = useState<boolean>(true);

  useEffect((): void => {
    if (localStorage.getItem("username"))
      setValue(localStorage.getItem("username") || "");

    let bestScore: any = localStorage.getItem("playerBest");
    if (bestScore < snake.length - 5) {
      localStorage.setItem("playerBest", (snake.length - 5).toString());
      dispatch(setPlayerBest(snake.length - 5));
    }
  }, [dispatch, snake]);

  const submit = (e: any): void => {
    e.preventDefault();

    if (snake.length - 5 >= 5 && value !== "") {
      const data = {
        username: value,
        score: snake.length - 5,
        date: new Date().toJSON().slice(0, -5),
      };

      axios
        .post(`/api/addPlayer`, {
          data,
        })
        .then((res: AxiosResponse) => {
          dispatch(setRequestType("day"));
          dispatch(setDataFetched(false));
          restartGame("waiting");
        })
        .catch((error: AxiosError) => console.error(error));

      localStorage.setItem("username", value);
    }
  };

  useEffect((): void => {
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

  const restartGame = (gameState2: "waiting" | "playing" | "over"): void => {
    setDirection({
      previous: null,
      current: "down",
    });
    setSnake({
      head: 0,
      body: [],
      length: 5,
    });
    setGameState(gameState2);
  };

  return (
    <div className="game">
      <div className="game__score">
        SCORE: <span>{snake.length - 5}</span>
      </div>

      <div className="game__board">
        {gameState === "waiting" && (
          <div className="game__board__start">
            <h1 className="game__board__start__title">SNAKE GAME</h1>
            <div className="game__board__start__logo">
              {Array.from(Array(12), (e, i) => (
                <div
                  key={i}
                  className={`game__board__start__logo__cell${
                    i <= 9 ? " game__board__start__logo__cell--dark" : ""
                  }${i === 11 ? " game__board__start__logo__cell--food" : ""}`}
                >
                  {i === 11 &&
                    Array.from(Array(9), (e, i) => (
                      <div
                        className={`${i % 2 !== 0 ? "dark" : ""}`}
                        key={i}
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
              onClick={() => setGameState("playing")}
              onMouseOver={() => setBlinking(false)}
              onMouseOut={() => setBlinking(true)}
            >
              START
            </button>
          </div>
        )}

        {gameState === "playing" &&
          board.map(
            (
              cell: {
                id: string;
                position: number;
                hasFood: boolean;
                hasSnake: boolean;
              },
              index: any
            ) => (
              <div
                className={`game__board__cell${
                  cell.hasSnake ? " game__board__cell--snake" : ""
                } ${cell.hasFood ? " game__board__cell--food" : ""}`}
                id={cell.id}
                key={index}
              >
                {cell.hasFood &&
                  Array.from(Array(9), (e, i) => (
                    <div
                      className={`${i % 2 !== 0 ? "dark" : ""}`}
                      key={i}
                    ></div>
                  ))}
              </div>
            )
          )}

        {gameState === "over" && (
          <div className="game__board__loss">
            <h1 className="game__board__loss__title">YOU LOST!</h1>
            {snake.length - 5 >= 5 ? (
              <h2 className="game__board__loss__info">
                ENTER YOUR NAME AND SUBMIT YOUR SCORE FOR OTHERS TO SEE
              </h2>
            ) : (
              <h2 className="game__board__loss__info">
                DO BETTER TO SUBMIT YOUR SCORE
              </h2>
            )}

            <form onSubmit={submit} className="game__board__loss__submitForm">
              {snake.length - 5 >= 5 && (
                <input
                  type="text"
                  maxLength={10}
                  value={value}
                  onChange={(e: any) => setValue(e.target.value.toUpperCase())}
                  className="game__board__loss__submitForm__usernameInput"
                  name="username"
                  required
                />
              )}

              {snake.length - 5 >= 5 && (
                <button
                  type="submit"
                  className={`game__board__loss__submitForm__submit ${
                    submitBlinking
                      ? "game__board__loss__submitForm__submit--blink"
                      : ""
                  }`}
                  onMouseOver={() => setSubmitBlinking(false)}
                  onMouseOut={() => setSubmitBlinking(true)}
                >
                  SUBMIT
                </button>
              )}

              <button
                className={`game__board__loss__submitForm__restart ${
                  restartBlinking
                    ? "game__board__loss__submitForm__restart--blink"
                    : ""
                }`}
                onClick={() => restartGame("playing")}
                onMouseOver={() => setRestartBlinking(false)}
                onMouseOut={() => setRestartBlinking(true)}
              >
                PLAY AGAIN
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
