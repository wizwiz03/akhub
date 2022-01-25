import { useParams } from 'react-router-dom';

import Suggestionbar from '../Suggestionbar/Suggestionbar';

import './GameBoard.css';

import game_list from '../assets/data/game_list.json';
import character_table from '../assets/data/character_table.json';

const GameBoard = () => {
  const { sub } = useParams();
  const game = game_list.find(el => el['sub'] === sub)
  const char_names = Object.keys(character_table).map(key => character_table[key]['name']);
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
      <Suggestionbar suggestions={char_names}/>
    </div>
  );
};

export default GameBoard;