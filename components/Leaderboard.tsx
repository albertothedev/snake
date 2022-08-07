import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import {
  setDataFetched,
  setRequestType,
  setPlayerBest,
  RootState,
  setPlayers,
} from "redux/index";

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
        .get<Array<Player>>(`/api/getPlayers`)
        .then((res) => {
          dispatch(setPlayers(res.data));
          dispatch(setDataFetched(true));
        })
        .catch((error) => console.error(error));
    }
  }, [dataFetched, dispatch]);

  return (
    <div className="leaderboard">
      <div className="leaderboard__title">RANKING</div>
      <div className="leaderboard__rankings">
        <div className="leaderboard__rankings__buttons">
          <button
            onClick={() => dispatch(setRequestType("day"))}
            className={`leaderboard__rankings__buttons__button${
              requestType === "day"
                ? " leaderboard__rankings__buttons__button--active"
                : ""
            }`}
          >
            DAY
          </button>
          <button
            onClick={() => dispatch(setRequestType("week"))}
            className={`leaderboard__rankings__buttons__button${
              requestType === "week"
                ? " leaderboard__rankings__buttons__button--active"
                : ""
            }`}
          >
            WEEK
          </button>
          <button
            onClick={() => dispatch(setRequestType("month"))}
            className={`leaderboard__rankings__buttons__button${
              requestType === "month"
                ? " leaderboard__rankings__buttons__button--active"
                : ""
            }`}
          >
            MONTH
          </button>
          <button
            onClick={() => dispatch(setRequestType("all"))}
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
          {dataFetched ? (
            players
              .filter((player) =>
                requestType === "all"
                  ? player
                  : player.date >= sortType[requestType]
              )
              .map((player, index) => (
                <div
                  className="leaderboard__rankings__players__player"
                  key={index}
                >
                  <div className="leaderboard__rankings__players__player__position">
                    {index + 1}
                  </div>
                  <div className="leaderboard__rankings__players__player__name">
                    {player.username}
                  </div>
                  <div className="leaderboard__rankings__players__player__score">
                    {player.score}
                  </div>
                </div>
              ))
          ) : (
            <span className="entry">FETCHING DATA...</span>
          )}
        </div>

        <span className="leaderboard__rankings__playerBest">
          YOUR BEST: {playerBest ? playerBest : 0}
        </span>
      </div>
    </div>
  );
};

export default Leaderboard;
