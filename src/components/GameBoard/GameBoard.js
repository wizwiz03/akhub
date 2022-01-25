import { useParams } from 'react-router-dom';

import './GameBoard.css';

import game_list from '../assets/data/game_list.json';

const GameBoard = () => {
  const { sub } = useParams();
  const game = game_list.find(el => el['sub'] === sub)
  const skill_images = importAll(require.context('../assets/images/skills', false, /\.(png|jpe?g|svg)$/));
  
  const getRandomImage = (images) => {
    const keys = Object.keys(images);
    return images[keys[parseInt(keys.length * Math.random())]]
  }

  function importAll(r) {
    return r.keys().reduce((prev, cur) => {
      prev[cur.replace('./', '')] = r(cur);
      return prev;
    }, {})
  }

  return (
    <div className='gameboard-container'>
      <h1>{game.title}</h1>
      <h2>{game.descr}</h2>
      <img src={getRandomImage(skill_images)} alt='todo'/>
    </div>
  );
};

export default GameBoard;