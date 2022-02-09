import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { createFilterOptions } from '@mui/material/Autocomplete';

import Gameover from './Gameover';
import Footer from './Footer';

import game_list from './assets/data/game_list.json';
import character_table from './assets/data/character_table.json';
import skill_table from './assets/data/skill_table.json';
import opname_to_code from './assets/data/opname_to_code.json';

const GameBoard = () => {
  const [cookies, setCookie] = useCookies(['hs_sq']);
  const game = game_list.find(mode => mode['sub'] === 'skill_quiz');
  const filterOptions = createFilterOptions({
    matchFrom: 'start'
  });

  const importAll = (r) => {
    return r.keys().reduce((prev, cur) => {
      prev[cur.replace('./', '').replace('.png', '')] = r(cur);
      return prev;
    }, {})
  }

  const char_names = Object.keys(opname_to_code).sort((a,b) => a.localeCompare(b));
  const avatar_img_paths = importAll(require.context('./assets/images/avatars_min', false, /\.(png|jpe?g|svg)$/));
  const skill_img_paths = importAll(require.context('./assets/images/skills2', false, /\.(png|jpe?g|svg)$/));
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
  const [isGameover, setIsGameover] = useState(false);
  const [perfectRes, setPerfectRes] = useState(false);

  const set_rand_skill = () => {
    if (remaining.length === 0) {
      setPerfectRes(true);
      setIsGameover(true);
      setRemaining([...skill_code_names]);
      setHighScore(curScore);
      setCookie('hs_pg', curScore, { path: '/', maxAge: 100000000 });
    }
    else {
      const new_skill = remaining[parseInt(remaining.length * Math.random())];
      setCurSkillCode(new_skill);
      setCurSkillName(skill_table[new_skill]['name']);
      setRemaining(remaining.filter(skill => skill !== new_skill))
    }
  }

  useEffect(() => {
    set_rand_skill();
    if (cookies.hs_sq) {
      setHighScore(cookies.hs_sq);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load_new_round = () => {
    setRoundResult(-1);
    setShowSolution(false);
    setUserInput(null);
    set_rand_skill();
  }

  const show_gameover = () => {
    setIsGameover(true);
  };

  useEffect(() => {
    let timer = null;
    if (roundResult === 1) {
      setCurScore(curScore + 1);
      timer = setTimeout(load_new_round, 2000);
    }
    if (roundResult === 0) {
      timer = setTimeout(show_gameover, 2000);
    }
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        setCookie('hs_sq', curScore, { path: '/', maxAge: 100000000 });
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
    setIsGameover(false);
    load_new_round();
    setPerfectRes(false);
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
    <Stack>
      {isGameover ? (
        <Gameover score_results={game.scores} score={curScore} playAgain={onClickPlay} perfect_res={perfectRes} title={game.title} />
      ) : (
        <Paper elevation={8} sx={{ flex: 1, padding: '16px 0' }}>
          <Container sx={{ p: { xs: 2, sm: 3, md: 4 } }} >
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
              <Box mb={2}>
                <Autocomplete
                  value={userInput}
                  onChange={onSubmit}
                  disablePortal
                  autoHighlight
                  clearOnEscape
                  blurOnSelect
                  disabled={roundResult === -1 ? false : true}
                  options={char_names}
                  filterOptions={ filterOptions }
                  sx={{ maxWidth: '300px', width: '70vw' }}
                  renderInput={tfProps => <TextField {...tfProps} label='Operator' sx={{ border: '1px solid rgb(250,250,250)', borderRadius: '6px' }} />}
                />
              </Box>
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
      )}
      <Footer />
    </Stack>
  )
}

export default GameBoard;