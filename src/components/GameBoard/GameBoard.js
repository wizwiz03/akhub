import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Suggestionbar from '../Suggestionbar/Suggestionbar';

import './GameBoard.css';

import game_list from '../assets/data/game_list.json';
import character_table from '../assets/data/character_table.json';
import skill_table from '../assets/data/skill_table.json';
import opname_to_code from '../assets/data/opname_to_code.json';


const GameBoard = () => {
  const { sub } = useParams();
  const game = game_list.find(el => el['sub'] === sub)

  const char_names = Object.keys(character_table).map(key => character_table[key]['name']);
  const char_names_lc = char_names.map(name => name.toLowerCase());
  const char_img_paths = importAll(require.context('../assets/images/characters', false, /\.(png|jpe?g|svg)$/));
  const skill_img_paths = importAll(require.context('../assets/images/skills', false, /\.(png|jpe?g|svg)$/));
  const skill_img_names = Object.keys(skill_img_paths);
  const skill_code_names = Object.keys(skill_table);
  
  const [userInput, setUserInput] = useState('');
  const [randNum, setRandNum] = useState();
  const [curSkillCode, setCurSkillCode] = useState();
  const [curScore, setCurScore] = useState(0);

  useEffect(() => {
    const random_number = parseInt(skill_img_names.length * Math.random());
    setRandNum(random_number);
    let [,,...codeStr] = skill_img_names[random_number].split('_');
    codeStr = codeStr.join('').split('.')[0];
    setCurSkillCode(codeStr);
  }, []);
  
  function importAll(r) {
    return r.keys().reduce((prev, cur) => {
      prev[cur.replace('./', '')] = r(cur);
      return prev;
    }, {})
  }

  const checkWinCon = () => {
    if (!char_names_lc.includes(userInput.toLowerCase())) {
      return false;
    }
    const user_char = char_names[char_names_lc.indexOf(userInput.toLowerCase())];
    return character_table[opname_to_code[user_char]]['skills'].includes(curSkillCode);
  };

  const onClick = e => {
    if (userInput === '') {
      return;
    }
    const win_con = checkWinCon();
    if (win_con) {

    }
    else {

    }
  }

  return (
    <div className='gameboard-container'>
      <h1>{game.title}</h1>
      <h2>{game.descr}</h2>
      <img src={skill_img_paths[skill_img_names[randNum]]} alt='todo'/>
      <Suggestionbar suggestions={char_names} userInput={userInput} setUserInput={setUserInput} />
      <button onClick={onClick}>Submit</button>
    </div>
  );
};

export default GameBoard;