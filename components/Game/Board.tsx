import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import useInterval from "utils/useInterval";
import { setGameState, setPlayerBest, setScore } from "redux/index";

const gameSpeed = 150;
const boardCells = 1000;

const generateBoard = () => {
  const board = [];

  for (let i = 0; i < boardCells; i++)
    board.push({
      id: `cell-${i}`,
      position: i,
      hasFood: false,
      hasSnake: false,
    });

  board[Math.floor(Math.random() * board.length)].hasFood = true;

  return board;
};

export default function Board() {
  const dispatch = useDispatch();

  const [direction, _setDirection] = useState<{
    current: "up" | "right" | "down" | "left" | null;
    new: "up" | "right" | "down" | "left";
  }>({
    current: null,
    new: "down",
  });
  const directionRef = useRef(direction);
  const setDirection = (data: {
    current: "up" | "right" | "down" | "left" | null;
    new: "up" | "right" | "down" | "left";
  }) => {
    directionRef.current = data;
    _setDirection(data);
  };
  const boardDimensions: { rows: number; columns: number } = {
    rows: 25,
    columns: 40,
  };
  const [board, setBoard] = useState<
    Array<{ id: string; position: number; hasFood: boolean; hasSnake: boolean }>
  >(generateBoard());
  const [snake, setSnake] = useState<{
    head: number;
    body: Array<number>;
    length: number;
  }>({
    head: 0,
    body: [],
    length: 5,
  });

  useEffect(() => {
    if (
      Number(localStorage.getItem("playerBest") as string) <
      snake.length - 5
    ) {
      localStorage.setItem("playerBest", (snake.length - 5).toString());
      dispatch(setPlayerBest(snake.length - 5));
    }
  }, [snake.length, dispatch]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => keyDown(e), false);

    const keyDown = (e: KeyboardEvent): void => {
      if (
        (e.key === "w" || e.key === "ArrowUp") &&
        directionRef.current.new !== "down" &&
        directionRef.current.new !== "up"
      )
        setDirection({
          current: directionRef.current.new,
          new: "up",
        });
      else if (
        (e.key === "s" || e.key === "ArrowDown") &&
        directionRef.current.new !== "up" &&
        directionRef.current.new !== "down"
      )
        setDirection({
          current: directionRef.current.new,
          new: "down",
        });
      else if (
        (e.key === "a" || e.key === "ArrowLeft") &&
        directionRef.current.new !== "right" &&
        directionRef.current.new !== "left"
      )
        setDirection({
          current: directionRef.current.new,
          new: "left",
        });
      else if (
        (e.key === "d" || e.key === "ArrowRight") &&
        directionRef.current.new !== "left" &&
        directionRef.current.new !== "right"
      )
        setDirection({
          current: directionRef.current.new,
          new: "right",
        });
    };
  }, []);

  useInterval(() => {
    moveSnake();
  }, gameSpeed);

  const moveSnake = (): void => {
    const snakeTemp = { ...snake };
    const boardTemp = [...board];

    snakeTemp.body.unshift(snakeTemp.head);

    switch (directionRef.current.new) {
      case "up":
        if (snakeTemp.head < boardDimensions.columns)
          return dispatch(setGameState("over"));

        snakeTemp.head -= boardDimensions.columns;
        break;

      case "right":
        if (((snakeTemp.head + 1) / boardDimensions.columns) % 1 === 0)
          return dispatch(setGameState("over"));

        snakeTemp.head += 1;
        break;

      case "down":
        if (
          snakeTemp.head >=
          boardDimensions.rows * boardDimensions.columns -
            boardDimensions.columns
        )
          return dispatch(setGameState("over"));

        snakeTemp.head += boardDimensions.columns;
        break;

      case "left":
        if (
          ((snakeTemp.head + boardDimensions.columns) /
            boardDimensions.columns) %
            1 ===
          0
        )
          return dispatch(setGameState("over"));

        snakeTemp.head -= 1;
        break;
    }

    if (snakeTemp.body.length >= snakeTemp.length) {
      const position: number = snakeTemp.body.pop() as number;
      boardTemp[position].hasSnake = false;
    }

    snakeTemp.body.forEach((position: number) => {
      if (position === snakeTemp.head) return dispatch(setGameState("over"));
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
    dispatch(setScore(snakeTemp.length - 5));
  };

  return (
    <>
      {board.map((cell, index) => (
        <div
          className={`game__board__cell${
            cell.hasSnake ? " game__board__cell--snake" : ""
          } ${cell.hasFood ? " game__board__cell--food" : ""}`}
          id={cell.id}
          key={index}
        >
          {cell.hasFood &&
            Array.from(Array(9), (e, i) => (
              <div className={`${i % 2 !== 0 ? "dark" : ""}`} key={i}></div>
            ))}
        </div>
      ))}
    </>
  );
}
