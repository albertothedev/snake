import Game from "components/Game";
import Leaderboard from "components/Leaderboard";

export default function Home() {
  return (
    <div className="app">
      <Game />
      <Leaderboard />
    </div>
  );
}
