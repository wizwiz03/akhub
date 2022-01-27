import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';

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

  const [userInput, setUserInput] = useState(null);
  const [randNum, setRandNum] = useState(0);
  const [curSkillCode, setCurSkillCode] = useState('skchr_absin_1');
  const [curSkillName, setCurSkillName] = useState('');
  const [curScore, setCurScore] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [roundResult, setRoundResult] = useState(-1);

  const set_rand_skill = () => {
    const random_number = parseInt(skill_code_names.length * Math.random());
    setRandNum(random_number);
    setCurSkillCode(skill_code_names[random_number]);
    console.log(skill_table[skill_code_names[random_number]]['op_names'][0]);
  }

  useEffect(() => {
    set_rand_skill()
  }, []);

  const load_new_round = () => {
    setShowSolution(false);
    setUserInput(null);
    set_rand_skill();
    setRoundResult(-1);
  }

  useEffect(() => {
    let timer = null;
    if (roundResult === 1) {
      console.log('Timeout triggered');
      setCurScore(curScore + 1);
      timer = setTimeout(load_new_round, 3000);
    }
    return () => clearTimeout(timer);
  }, [roundResult])

  function importAll(r) {
    return r.keys().reduce((prev, cur) => {
      prev[cur.replace('./', '').replace('.png', '')] = r(cur);
      return prev;
    }, {})
  }

  const checkWinCon = (val) => {
    if (!char_names_lc.includes(val.toLowerCase())) {
      return false;
    }
    const user_char = char_names[char_names_lc.indexOf(val.toLowerCase())];
    return character_table[opname_to_code[user_char]]['skills'].includes(curSkillCode);
  };

  const processRound = (val) => {
    setCurSkillName(skill_table[curSkillCode]['name']);
    setShowSolution(true);
    const win_con = checkWinCon(val);
    if (win_con) {
      setRoundResult(1);
    }
    else {
      setRoundResult(0);
    }
  }

  const onSubmit = (e, val) => {
    if (val) {
      setUserInput(val);
      processRound(val);
    }
  }

  const onClickPlay = () => {
    load_new_round();
    setCurScore(0);
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
        <Grow
          unmountOnExit
          in={showSolution}
          sx={{ transformOrigin: '0 0 0', mb: 2 }}
          {...(showSolution ? { timeout: 1000 } : {})}
        >
          <Typography component='div'>
            {curSkillName}
          </Typography>
        </Grow>
        <Box sx={{ display: roundResult ? 'block' : 'none' }}>
          <Autocomplete
            value={userInput}
            onChange={onSubmit}
            disablePortal
            autoHighlight
            clearOnEscape
            options={char_names}
            sx={{ width: 300 }}
            renderInput={tfProps => <TextField {...tfProps} label='Operator' />}
          />
          <Typography component='div' variant='h6'>
            Current Score: {curScore}
          </Typography>
        </Box>
        <Box sx={{ display: roundResult ? 'none' : 'block' }}>
          <Typography component='div'>
            Gameover =(
          </Typography>
          <Typography component='div'>
            Your final score: {curScore}
          </Typography>
          <Button onClick={onClickPlay}>Play Again</Button>
        </Box>
      </Box>
    </>
  )
}

export default GameBoard;