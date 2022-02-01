import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import ReplayIcon from '@mui/icons-material/Replay';

import game_list from './assets/data/game_list.json';
import character_table from './assets/data/character_table.json';
import skill_table from './assets/data/skill_table.json';
import opname_to_code from './assets/data/opname_to_code.json';

const GameBoard = () => {
  const [cookies, setCookie] = useCookies(['hs_sq']);
  const game = game_list.find(mode => mode['sub'] === 'skill_quiz');


  const importAll = (r) => {
    return r.keys().reduce((prev, cur) => {
      prev[cur.replace('./', '').replace('.png', '')] = r(cur);
      return prev;
    }, {})
  }

  // ['Myrtle', 'Bagpipe', ...]
  // const char_names = Object.keys(character_table).map(key => character_table[key]['name']);
  const char_names = Object.keys(opname_to_code);

  // { 'char_002_amiya_1': <webpack_img_path>, 'char_003_kalts_1': <webpack_img_path>, ... }
  const avatar_img_paths = importAll(require.context('./assets/images/avatars', false, /\.(png|jpe?g|svg)$/));

  // { 'skchr_absin_1': <webpack_img_path>, 'skchr_aglina_1': <webpack_img_path>, ... }
  const skill_img_paths = importAll(require.context('./assets/images/skills2', false, /\.(png|jpe?g|svg)$/));

  // ['skchr_absin_1', 'skchr_aglina_1', ...]
  const skill_code_names = Object.keys(skill_table);


  const [userInput, setUserInput] = useState(null);
  const [remaining, setRemaining] = useState([...skill_code_names]);
  const [curSkillCode, setCurSkillCode] = useState('skchr_absin_1');
  const [curSkillName, setCurSkillName] = useState('');
  const [curScore, setCurScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [roundResult, setRoundResult] = useState(-1);
  const [operatorName, setOperatorName] = useState('');

  const set_rand_skill = () => {
    if (remaining.length === 0) {
      // todo do something special
    }
    const new_skill = remaining[parseInt(remaining.length * Math.random())];
    setCurSkillCode(new_skill);
    setCurSkillName(skill_table[new_skill]['name']);
    setRemaining(remaining.filter(skill => skill !== new_skill))
    console.log(skill_table[new_skill]['op_names'][0]);
  }

  useEffect(() => {
    set_rand_skill();
    if (cookies.hs_sq) {
      setHighScore(cookies.hs_sq);
    }
  }, []);

  const load_new_round = () => {
    setRoundResult(-1);
    setShowSolution(false);
    setUserInput(null);
    set_rand_skill();
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

  const processRound = (val) => {
    setShowSolution(true);
    const win_con = character_table[opname_to_code[val]]['skills'].includes(curSkillCode);
    if (win_con) {
      setOperatorName(val);
      setRoundResult(1);
    }
    else {
      setOperatorName(skill_table[curSkillCode]['op_names'][0]);
      setRoundResult(0);
      setRemaining([...skill_code_names]);
      if (curScore > highScore) {
        setHighScore(curScore);
        setCookie('hs_sq', curScore, { path: '/' });
      }
    }
  }

  const onSubmit = (e, val) => {
    if (val) {
      setUserInput(val);
      processRound(val);
    }
  }

  const onClickPlay = () => {
    setCurScore(0);
    load_new_round();
  }

  const createItem = (imgSrc, altText, subText) => (
    <Collapse orientation='horizontal'>
      <Box
        component={Stack}
        justifyContent='center'
        alignItems='center'
      >
        <Box
          component='img'
          src={imgSrc}
          alt={altText}
          sx={{ width: { xs: '100px', md: '128px' }, height: { xs: '100px', md: '128px' }, border: '1px solid white' }}
          mb={2}
        />
        <Typography textAlign='center' sx={{ maxWidth: { xs: '100px', sm: 'none' } }}>
          {subText}
        </Typography>
      </Box>
    </Collapse>
  );

  return (
    <Paper elevation={8}>
      <Container sx={{ p: {xs: 2, sm: 3, md: 4} }} >
        <Typography variant='h4' textAlign='center' gutterBottom>
          {game.title}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='h6' textAlign='center' gutterBottom>
            {game.descr}
          </Typography>
          <Paper
            elevation={24}
            sx={{
              minWidth: '200px',
              p: { xs: '12px', md: '16px' },
              mb: '24px',
              mt: '8px',
              boxShadow: roundResult ? roundResult === 1 ? `rgba(56, 142, 60) 0px 5px 15px` : null : `rgba(211, 47, 47) 0px 5px 15px`
            }}
          >
            <TransitionGroup
              component={Stack}
              divider={<Divider orientation="vertical" flexItem />}
              direction='row'
              spacing={2}
              justifyContent='center'
              alignItems='center'
            >
              {
                showSolution &&
                createItem(avatar_img_paths[opname_to_code[operatorName]], 'image of operator solution', operatorName)
              }
              {createItem(skill_img_paths[curSkillCode], 'skill icon to guess', curSkillName)}
            </TransitionGroup>
          </Paper>
          {
            roundResult ? (
              <Box mb={2}>
                <Autocomplete
                  value={userInput}
                  onChange={onSubmit}
                  disablePortal
                  autoHighlight
                  clearOnEscape
                  blurOnSelect
                  options={char_names}
                  sx={{ maxWidth: '300px', width: '70vw' }}
                  renderInput={tfProps => <TextField {...tfProps} label='Operator' sx={{border: '1px solid rgb(250,250,250)', borderRadius: '6px'}} />}
                />
              </Box>
            ) : (
              <Stack mb={2} alignItems='center' spacing={1}>
                <Typography textAlign='center' variant='h6'>Looks like you have lost the game. Try again?</Typography>
                <Button variant='contained' endIcon={<ReplayIcon />} onClick={onClickPlay}>Play Again</Button>
              </Stack>
            )
          }
          <Stack direction='row' spacing={10} justifyContent='space-around'>
            <Typography textAlign='center' component='div'>
              Your High Score: {highScore}
            </Typography>
            <Typography textAlign='center' component='div'>
              Current Score: {curScore}
            </Typography>
          </Stack>
        </Box>
      </Container >
    </Paper>
  )
}

export default GameBoard;