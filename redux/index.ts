import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  dataFetched: boolean;
  requestType: "day" | "week" | "month" | "all";
  playerBest: number;
  players: Array<Player>;
  gameState: "waiting" | "playing" | "over";
  score: number;
};

const initialState: State = {
  dataFetched: false,
  requestType: "all",
  playerBest: 0,
  players: [],
  gameState: "waiting",
  score: 0,
};

const rootSlice = createSlice({
  name: "rootSlice",
  initialState,
  reducers: {
    setDataFetched: (state, action: PayloadAction<State["dataFetched"]>) =>
      void (state.dataFetched = action.payload),
    setPlayerBest: (state, action: PayloadAction<State["playerBest"]>) =>
      void (state.playerBest = action.payload),
    setRequestType: (state, action: PayloadAction<State["requestType"]>) =>
      void (state.requestType = action.payload),
    setPlayers: (state, action: PayloadAction<State["players"]>) =>
      void (state.players = action.payload),
    setGameState: (state, action: PayloadAction<State["gameState"]>) =>
      void (state.gameState = action.payload),
    setScore: (state, action: PayloadAction<State["score"]>) =>
      void (state.score = action.payload),
  },
});

export const {
  setDataFetched,
  setPlayerBest,
  setRequestType,
  setPlayers,
  setGameState,
  setScore,
} = rootSlice.actions;

const store = configureStore({ reducer: rootSlice.reducer });

export type RootState = State;

export default store;
