import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios, { AxiosError, AxiosResponse } from "axios";

import { setDataFetched, setRequestType, setPlayerBest } from "../../../redux";

type LossProps = {
  restartGame: Function;
  score: number;
};

const Loss = ({ restartGame, score }: LossProps): JSX.Element => {
  const dispatch = useDispatch();

  const [value, setValue] = useState<any>("");
  const [submitBlinking, setSubmitBlinking] = useState<boolean>(true);
  const [restartBlinking, setRestartBlinking] = useState<boolean>(true);

  const handleChange = (e: any): void => {
    e.persist();
    setValue(e.target.value.toUpperCase());
  };

  const submit = (e: any): void => {
    e.preventDefault();

    if (score >= 5 && value !== "") {
      const data = {
        username: value,
        score: score,
        date: new Date().toJSON().slice(0, -5),
      };

      axios
        .post(`${process.env.REACT_APP_SNAKE_API_URL}/addPlayer`, { data })
        .then((res: AxiosResponse) => {
          dispatch(setRequestType("day"));
          dispatch(setDataFetched(false));
        })
        .catch((error: AxiosError) => console.error(error));

      localStorage.setItem("username", value);
    }

    restartGame();
  };

  useEffect((): void => {
    if (localStorage.getItem("username"))
      setValue(localStorage.getItem("username"));

    let bestScore: any = localStorage.getItem("playerBest");
    if (bestScore < score) {
      localStorage.setItem("playerBest", score.toString());
      dispatch(setPlayerBest(score));
    }
  }, []);

  return (
    <div className="loss">
      <h1 className="loss__title">YOU LOST!</h1>
      <h2 className="loss__info">
        ENTER YOUR NAME AND SUBMIT YOUR SCORE FOR OTHERS TO SEE
      </h2>
      <form onSubmit={submit} className="loss__submitForm">
        {score >= 5 && (
          <div>
            <input
              type="text"
              maxLength={10}
              value={value}
              onChange={handleChange}
              className="loss__submitForm__usernameInput"
              name="username"
            />
            <button
              type="submit"
              className={`loss__submitForm__submit ${
                submitBlinking ? "loss__submitForm__submit--blink" : ""
              }`}
              onMouseOver={() => setSubmitBlinking(false)}
              onMouseOut={() => setSubmitBlinking(true)}
            >
              SUBMIT
            </button>
          </div>
        )}
        <button
          className={`loss__submitForm__restart ${
            restartBlinking ? "loss__submitForm__restart--blink" : ""
          }`}
          onClick={() => restartGame()}
          onMouseOver={() => setRestartBlinking(false)}
          onMouseOut={() => setRestartBlinking(true)}
        >
          PLAY AGAIN
        </button>
      </form>
    </div>
  );
};

export default Loss;
