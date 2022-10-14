import { useState, useEffect } from "react";
import axios, { type AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  setDataFetched,
  setGameState,
  setRequestType,
  RootState,
} from "redux/index";

export default function Loss() {
  const dispatch = useDispatch();

  const { score } = useSelector((state: RootState) => state);

  const [submitBlinking, setSubmitBlinking] = useState<boolean>(true);
  const [restartBlinking, setRestartBlinking] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");

  useEffect((): void => {
    if (localStorage.getItem("username"))
      setValue(localStorage.getItem("username") as string);
  }, []);

  const submit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (score >= 5 && value !== "") {
      const data = {
        username: value,
        score: score,
        date: new Date().toJSON().slice(0, -5),
      };

      axios
        .post(`/api/addPlayer`, {
          data,
        })
        .then(() => {
          dispatch(setRequestType("day"));
          dispatch(setDataFetched(false));

          dispatch(setGameState("waiting"));
        })
        .catch((error: AxiosError) => console.error(error));

      localStorage.setItem("username", value);
    }
  };

  return (
    <div className="game__board__loss">
      <h1 className="game__board__loss__title">YOU LOST!</h1>
      {score >= 5 ? (
        <h2 className="game__board__loss__info">
          ENTER YOUR NAME AND SUBMIT YOUR SCORE FOR OTHERS TO SEE
        </h2>
      ) : (
        <h2 className="game__board__loss__info">
          DO BETTER TO SUBMIT YOUR SCORE
        </h2>
      )}

      <form onSubmit={submit} className="game__board__loss__submitForm">
        {score >= 5 && (
          <input
            type="text"
            maxLength={10}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value.toUpperCase())
            }
            className="game__board__loss__submitForm__usernameInput"
            name="username"
            required
          />
        )}

        {score >= 5 && (
          <button
            type="submit"
            className={`game__board__loss__submitForm__submit ${
              submitBlinking
                ? "game__board__loss__submitForm__submit--blink"
                : ""
            }`}
            onMouseOver={() => setSubmitBlinking(false)}
            onFocus={() => setSubmitBlinking(false)}
            onMouseOut={() => setSubmitBlinking(true)}
            onBlur={() => setSubmitBlinking(true)}
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
          onClick={() => dispatch(setGameState("playing"))}
          onMouseOver={() => setRestartBlinking(false)}
          onFocus={() => setRestartBlinking(false)}
          onMouseOut={() => setRestartBlinking(true)}
          onBlur={() => setRestartBlinking(true)}
          type="button"
        >
          PLAY AGAIN
        </button>
      </form>
    </div>
  );
}
