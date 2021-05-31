export type TPlayer = {
  username: string;
  score: number;
  date: string;
};

export type TCell = {
  id: string;
  position: number;
  hasFood: boolean;
  hasSnake: boolean;
};

export type TSnake = {
  head: number;
  body: Array<number>;
  length: number;
};
