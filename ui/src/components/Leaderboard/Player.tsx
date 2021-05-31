type PlayerProps = {
  position: number;
  name: string;
  score: number;
};

const Player = ({ position, name, score }: PlayerProps): JSX.Element => (
  <div id={`player-${position}`} className="player">
    <div id={`player-${position}-position`} className="player__position">
      {position}
    </div>
    <div id={`player-${position}-name`} className="player__name">
      {name}
    </div>
    <div id={`player-${position}-score`} className="player__score">
      {score}
    </div>
  </div>
);

export default Player;
