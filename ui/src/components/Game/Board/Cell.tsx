import { TCell } from "../../../types/index";

type CellProps = {
  cell: TCell;
};

const Cell = ({ cell }: CellProps): JSX.Element => (
  <div
    className={`cell${cell.hasSnake ? " cell--snake" : ""} ${
      cell.hasFood ? " cell--food" : ""
    }`}
    id={cell.id}
  >
    {cell.hasFood &&
      Array.from(Array(9), (e, i) => (
        <div className={`${i % 2 !== 0 ? "dark" : ""}`} key={i}></div>
      ))}
  </div>
);

export default Cell;
