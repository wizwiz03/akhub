import CardGrid from '../CardGrid/CardGrid';

import './Games.css';

import game_list from '../assets/data/game_list.json';
import images from '../assets/images/games/index';

const Games = () => {
  return (
    <div className='games-home'>
      <h1>Available Games</h1>
      <CardGrid data_list={game_list} images={images} />
    </div>
  );
};

export default Games;