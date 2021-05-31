import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import Player from "./Leaderboard/Player";
import {
  setDataFetched,
  setRequestType,
  setPlayerBest,
  RootState,
  setPlayers,
} from "../redux";
import { TPlayer } from "../types/index";

const Leaderboard = (): JSX.Element => {
  const dispatch = useDispatch();

  const { dataFetched, requestType, playerBest, players } = useSelector(
    (state: RootState) => state
  );

  const sortType: { day: string; week: string; month: string } = {
    day: new Date(new Date().setDate(new Date().getDate() - 1))
      .toISOString()
      .slice(0, -5),
    week: new Date(new Date().setDate(new Date().getDate() - 7))
      .toISOString()
      .slice(0, -5),
    month: new Date(new Date().setMonth(new Date().getMonth() - 1))
      .toISOString()
      .slice(0, -5),
  };

  useEffect(() => {
    if (!dataFetched) {
      if (localStorage.getItem("playerBest"))
        dispatch(setPlayerBest(Number(localStorage.getItem("playerBest"))));

      axios
        .get(`${process.env.REACT_APP_SNAKE_API_URL}/getPlayers`)
        .then((res) => {
          dispatch(setPlayers(res.data));
          dispatch(setDataFetched(true));
        })
        .catch((error) => console.error(error));
    }
  }, [dataFetched]);

  const APICall = (e: any) => dispatch(setRequestType(e.target.id.slice(7)));

  return (
    <div className="leaderboard">
      <div className="leaderboard__title">LEADERBOARD</div>
      <div className="leaderboard__rankings">
        <div className="leaderboard__rankings__buttons">
          <button
            onClick={(e) => APICall(e)}
            id="button-day"
            className={`leaderboard__rankings__buttons__button${
              requestType === "day"
                ? " leaderboard__rankings__buttons__button--active"
                : ""
            }`}
          >
            DAY
          </button>
          <button
            onClick={(e) => APICall(e)}
            id="button-week"
            className={`leaderboard__rankings__buttons__button${
              requestType === "week"
                ? " leaderboard__rankings__buttons__button--active"
                : ""
            }`}
          >
            WEEK
          </button>
          <button
            onClick={(e) => APICall(e)}
            id="button-month"
            className={`leaderboard__rankings__buttons__button${
              requestType === "month"
                ? " leaderboard__rankings__buttons__button--active"
                : ""
            }`}
          >
            MONTH
          </button>
          <button
            onClick={(e) => APICall(e)}
            id="button-all"
            className={`leaderboard__rankings__buttons__button${
              requestType === "all"
                ? " leaderboard__rankings__buttons__button--active"
                : ""
            }`}
          >
            ALL
          </button>
        </div>

        <div className="leaderboard__rankings__header">
          <div className="leaderboard__rankings__header__position">#</div>
          <div className="leaderboard__rankings__header__name">PLAYER</div>
          <div className="leaderboard__rankings__header__score">PTS</div>
        </div>

        <div className="leaderboard__rankings__players">
          {!dataFetched && <div className="entry">FETCHING DATA...</div>}
          {dataFetched && requestType !== "all"
            ? players.map((player: TPlayer, index: number) =>
                player.date >= sortType[requestType] ? (
                  <Player
                    position={index + 1}
                    name={player.username}
                    score={player.score}
                    key={`Player#${index + 1}`}
                  />
                ) : null
              )
            : null}

          {dataFetched && requestType === "all"
            ? players.map((player: TPlayer, index: number) => (
                <Player
                  position={index + 1}
                  name={player.username}
                  score={player.score}
                  key={`Player#${index + 1}`}
                />
              ))
            : null}
        </div>

        <div className="leaderboard__rankings__playerBest">
          <div>YOUR BEST:&nbsp;</div>
          <div className="leaderboard__rankings__playerBest__score">
            {playerBest ? playerBest : 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
