import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TPlayer } from "types/index";

type TInitialState = {
  dataFetched: boolean;
  requestType: "day" | "week" | "month" | "all";
  playerBest: number;
  players: Array<TPlayer>;
};

const initialState: TInitialState = {
  dataFetched: false,
  requestType: "all",
  playerBest: 0,
  players: [],
};

const rootSlice = createSlice({
  name: "rootSlice",
  initialState,
  reducers: {
    setDataFetched: (state, action: PayloadAction<boolean>) =>
      void (state.dataFetched = action.payload),
    setPlayerBest: (state, action: PayloadAction<number>) =>
      void (state.playerBest = action.payload),
    setRequestType: (
      state,
      action: PayloadAction<"day" | "week" | "month" | "all">
    ) => void (state.requestType = action.payload),
    setPlayers: (state, action: PayloadAction<Array<TPlayer>>) =>
      void (state.players = action.payload),
  },
});

export const { setDataFetched, setPlayerBest, setRequestType, setPlayers } =
  rootSlice.actions;

const store = configureStore({ reducer: rootSlice.reducer });

export type RootState = ReturnType<typeof store.getState>;

export default store;
