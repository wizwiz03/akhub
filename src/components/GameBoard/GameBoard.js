import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import game_list from '../assets/data/game_list.json';
import character_table from '../assets/data/character_table.json';
import skill_table from '../assets/data/skill_table.json';
import opname_to_code from '../assets/data/opname_to_code.json';

const GameBoard = () => {
  const { sub } = useParams();
  const game = game_list.find(el => el['sub'] === sub)

  // ['Myrtle', 'Bagpipe', ...]
  const char_names = Object.keys(character_table).map(key => character_table[key]['name']);
  const char_names_lc = char_names.map(name => name.toLowerCase());

  // { 'char_002_amiya_1': <webpack_img_path>, 'char_003_kalts_1': <webpack_img_path>, ... }
  const char_img_paths = importAll(require.context('../assets/images/characters', false, /\.(png|jpe?g|svg)$/));

  // { 'skchr_absin_1': <webpack_img_path>, 'skchr_aglina_1': <webpack_img_path>, ... }
  const skill_img_paths = importAll(require.context('../assets/images/skills2', false, /\.(png|jpe?g|svg)$/));

  // ['skchr_absin_1', 'skchr_aglina_1', ...]
  const skill_code_names = Object.keys(skill_table);

  const [userInput, setUserInput] = useState('');
  const [randNum, setRandNum] = useState();
  const [curSkillCode, setCurSkillCode] = useState('skchr_absin_1');
  const [curScore, setCurScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const random_number = parseInt(skill_code_names.length * Math.random());
    setRandNum(random_number);
    setCurSkillCode(skill_code_names[random_number]);
  }, []);

  function importAll(r) {
    return r.keys().reduce((prev, cur) => {
      prev[cur.replace('./', '').replace('.png', '')] = r(cur);
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

  const processRound = () => {
    const win_con = checkWinCon();
    console.log(win_con);
    if (win_con) {
      setCurScore(curScore + 1);
      setShowResult(true);
    }
  }

  const onSubmit = e => {
    console.log(userInput);
    if (!userInput) {
      return;
    }
    processRound();
  }

  return (
    <>
      <Typography variant='h3' component='div' textAlign='center' gutterBottom>
        {game.title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant='h6' component='div' gutterBottom>
          {game.descr}
        </Typography>
        <Box
          component='img'
          src={skill_img_paths[skill_code_names[randNum]]}
          alt='skill icon to guess'
          mb={2}
        />
        <Typography component='div' sx={{ mb: 2, display: showResult ? 'block' : 'none' }}>
          {skill_table[curSkillCode]['name']}
        </Typography>
        <Box>
          <Autocomplete
            inputValue={userInput}
            onInputChange={(e, new_val) => setUserInput(new_val)}
            freeSolo
            disablePortal
            options={char_names}
            sx={{ width: 300 }}
            renderInput={tfProps => <TextField {...tfProps} label='Operator' />}
          />
          <Button variant='outlined' onClick={onSubmit}>Submit</Button>
        </Box>
      </Box>
    </>
  )
}

export default GameBoard;