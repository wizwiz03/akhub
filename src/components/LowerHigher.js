import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import ReplayIcon from '@mui/icons-material/Replay';

import char_stats from './assets/data/char_stats.json';
import opname_to_code from './assets/data/opname_to_code.json';

const LowerHigher = () => {
  const [cookies, setCookie] = useCookies(['hs_lh']);

  const importAll = (r) => {
    return r.keys().reduce((prev, cur) => {
      prev[cur.replace('./', '').replace('.png', '')] = r(cur);
      return prev;
    }, {})
  }

  const char_img_paths = importAll(require.context('./assets/images/characters_min_512', false, /\.(png|jpe?g|svg)$/));
  const char_codes = Object.keys(char_stats);
  const available_stats = { 'maxHp': 'HP', 'atk': 'ATK', 'def': 'DEF', 'magicResistance': 'Arts Resist', 'baseAttackTime': 'Attack Interval' };
  const stat_codes = Object.keys(available_stats);

  const [charMemory, setCharMemory] = useState([]);
  const [curStat, setCurStat] = useState();
  const [curScore, setCurScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [roundResult, setRoundResult] = useState(-1);
  const [solutionStats, setSolutionStats] = useState([]);

  const get_random_char = () => {
    return char_codes[parseInt(char_codes.length * Math.random())];
  };

  const set_rand_matchup = () => {
    setCurStat(stat_codes[parseInt(stat_codes.length * Math.random())]);
    let char_new = get_random_char();
    if (charMemory.length === 0) {
      let char_2 = char_new;
      while (char_2 === char_new) {
        char_2 = get_random_char();
      }
      setCharMemory([char_new, char_2]);
    }
    else {
      while (char_new === charMemory.at(-1)) {
        char_new = get_random_char();
      }
      setCharMemory([...charMemory, char_new]);
    }
  }

  const load_new_round = () => {
    set_rand_matchup();
    setRoundResult(-1);
  };

  useEffect(() => {
    set_rand_matchup();
    if (cookies.hs_lh) {
      setHighScore(cookies.hs_lh);
    }
  }, []);

  useEffect(() => {
    let timer = null;
    if (roundResult === 1) {
      console.log('Timeout triggered');
      setCurScore(curScore + 1);
      timer = setTimeout(load_new_round, 3000);
    }
    return () => clearTimeout(timer);
  }, [roundResult]);

  const check_set_solution = (user_val) => {
    const stat_a = char_stats[charMemory.at(-2)]['phases'][2]['attributesKeyFrames'][0]['data'][curStat];
    const stat_b = char_stats[charMemory.at(-1)]['phases'][2]['attributesKeyFrames'][0]['data'][curStat];
    setSolutionStats([stat_a, stat_b]);
    const sol_val = stat_a === stat_b ? opname_to_code[user_val] : stat_a > stat_b ? charMemory.at(-2) : charMemory.at(-1);
    return opname_to_code[user_val] === sol_val;
  };

  const processRound = (user_val) => {
    const win_con = check_set_solution(user_val);
    if (win_con) {
      setRoundResult(1);
    }
    else {
      setCharMemory([]);
      setRoundResult(0);
      if (curScore > highScore) {
        setHighScore(curScore);
        setCookie('hs_lh', curScore, { path: '/' });
      }
    }
  };

  const onClickSol = (e) => {
    processRound(e.currentTarget.textContent);
  };

  const playAgain = () => {
    setCurScore(0);
    load_new_round();
  };

  return (
    <Container sx={{ minHeight: '100vh', padding: 0, position: 'relative' }}>
      <TransitionGroup>
        {
          charMemory.map((char, index) => {
            if (index < charMemory.length - 2) {
              return null;
            }
            const img_key = char + '_2';
            return (
              <Collapse key={index}>
                <Box
                  sx={{
                    background: `url(${char_img_paths[img_key]}) no-repeat center, 'rgb(237,237,237)'`,
                    background: `url(${char_img_paths[img_key]}) no-repeat center, radial-gradient(circle, rgba(237,237,237,1) 0%, rgba(120,120,120,1) 100%)`,
                    backgroundSize: 'contain, auto auto'
                  }}
                >
                  {index === charMemory.length - 2 ? (
                    <Stack
                      alignItems='center'
                      sx={{
                        padding: '16px 16px 32px 16px',
                        height: '50vh',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        borderBottom: '1px solid black'
                      }}
                    >
                      <Stack direction='row' justifyContent='space-between' sx={{ width: '100%' }}>
                        <Typography>
                          High Score: {highScore}
                        </Typography>
                        <Typography>
                          Score: {curScore}
                        </Typography>
                      </Stack>
                      <Typography variant='h6' textAlign='center' py={2}>
                        Which Operator (E2Lv1) has higher {available_stats[curStat]}?
                      </Typography>
                      <Stack alignItems='center' mt='auto'>
                        <Typography variant='body0'>
                          {char_stats[char]['name']}
                        </Typography>
                        <Typography variant='body0'>
                          {available_stats[curStat]}
                        </Typography>
                        {roundResult !== -1 && (
                          <Typography variant='body0'>
                            {solutionStats.at(-2)}
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                  ) : (
                    <Stack
                      alignItems='center'
                      p={2}
                      pt={4}
                      sx={{ height: '50vh', backgroundColor: 'rgba(0,0,0,0.4)' }}
                    >
                      <Stack alignItems='center'>
                        {roundResult !== -1 && (
                          <Typography variant='body0'>
                            {solutionStats.at(-1)}
                          </Typography>
                        )}
                        <Typography variant='body0'>
                          {available_stats[curStat]}
                        </Typography>
                        <Typography variant='body0'>
                          {char_stats[char]['name']}
                        </Typography>
                      </Stack>
                      <Stack my='auto' spacing={2}>
                        {[-2, -1].map(j => (
                          <Button key={j} variant='outlined' onClick={onClickSol} disabled={roundResult === 1 ? true : false}
                            sx={{ color: 'white', border: '2px solid white', borderRadius: '8px' }}
                          >
                            {char_stats[charMemory.at(j)]['name']}
                          </Button>
                        ))}
                      </Stack>
                    </Stack>
                  )}
                </Box>
              </Collapse>
            );
          })
        }
      </TransitionGroup>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        backgroundColor: '#fff',
        borderRadius: '50%',
        width: '3rem',
        height: '3rem',
        transform: 'translate(-50%, -50%)'
      }}>
        <Box sx={{
          color: 'black',
          textAlign: 'center',
          verticalAlign: 'middle',
          display: 'table-cell',
          fontSize: '1.1rem',
          fontWeight: '700',
          height: '3rem',
          width: '3rem'
        }}
        >
          VS
        </Box>
      </Box>
      {!roundResult && (
        <Stack my='auto'>
          <Typography>
            Oh no, you lost.
          </Typography>
          <Button endIcon={<ReplayIcon />} variant='outlined' onClick={playAgain}>
            Play Again
          </Button>
        </Stack>
      )}
    </Container>
  );
};

export default LowerHigher;