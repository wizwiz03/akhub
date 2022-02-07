import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CountUp from 'react-countup';

import Footer from './Footer';
import Gameover from './Gameover';

import game_list from './assets/data/game_list.json';
import char_stats from './assets/data/char_stats.json';
import opname_to_code from './assets/data/opname_to_code.json';

const LowerHigher = () => {
  const [cookies, setCookie] = useCookies(['hs_lh']);
  const theme = useTheme();
  const game = game_list.find(mode => mode['sub'] === 'lower_higher');

  const importAll = (r) => {
    return r.keys().reduce((prev, cur) => {
      prev[cur.replace('./', '').replace('.png', '')] = r(cur);
      return prev;
    }, {})
  }

  const char_img_paths = importAll(require.context('./assets/images/characters_512_tinyfied', false, /\.(png|jpe?g|svg)$/));
  const char_codes = Object.keys(char_stats);
  const available_stats = { 'maxHp': 'HP', 'atk': 'ATK', 'def': 'DEF', 'magicResistance': 'Arts Resist', 'baseAttackTime': 'Attack Interval' };
  const stat_codes = Object.keys(available_stats);

  const [charMemory, setCharMemory] = useState([]);
  const [curStat, setCurStat] = useState();
  const [curScore, setCurScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [roundResult, setRoundResult] = useState(-1);
  const [solutionStats, setSolutionStats] = useState([]);
  const [isGameover, setIsGameover] = useState(false);

  const get_random_char = () => {
    return char_codes[parseInt(char_codes.length * Math.random())];
  };

  const set_rand_matchup = () => {
    const new_stat = stat_codes[parseInt(stat_codes.length * Math.random())];
    setCurStat(new_stat);
    let char_new = get_random_char();
    if (charMemory.length === 0) {
      let char_2 = char_new;
      while (char_2 === char_new) {
        char_2 = get_random_char();
      }
      setCharMemory([char_new, char_2]);
      console.log(char_stats[char_new]['statsE2LV1'][new_stat], char_stats[char_2]['statsE2LV1'][new_stat]);
    }
    else {
      while (char_new === charMemory.at(-1)) {
        char_new = get_random_char();
      }
      console.log(char_stats[charMemory.at(-1)]['statsE2LV1'][new_stat], char_stats[char_new]['statsE2LV1'][new_stat]);
      setCharMemory([...charMemory, char_new]);
    }
  }

  useEffect(() => {
    set_rand_matchup();
    if (cookies.hs_lh) {
      setHighScore(cookies.hs_lh);
    }
  }, []);

  const load_new_round = () => {
    set_rand_matchup();
    setRoundResult(-1);
  };

  const show_gameover = () => {
    setCharMemory([]);
    setIsGameover(true);
  };

  useEffect(() => {
    let timer = null;
    if (roundResult === 1) {
      console.log('Timeout triggered');
      setCurScore(curScore + 1);
      timer = setTimeout(load_new_round, 2500);
    }
    if (roundResult === 0) {
      timer = setTimeout(show_gameover, 2500);
    }
    return () => clearTimeout(timer);
  }, [roundResult]);

  const check_set_solution = (user_val) => {
    const stat_a = char_stats[charMemory.at(-2)]['statsE2LV1'][curStat];
    const stat_b = char_stats[charMemory.at(-1)]['statsE2LV1'][curStat];
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
    setIsGameover(false);
    load_new_round();
  };

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      {isGameover ? (
        <>
          <Gameover score_results={game.scores} score={curScore} playAgain={playAgain} perfect_res={false} />
          <Footer />
        </>
      ) : (
        <TransitionGroup>
          {
            charMemory.map((char, index) => {
              if (index < charMemory.length - 2) {
                return null;
              }
              const img_key = char + '_2';
              return (
                <Collapse key={index}>
                  <Stack
                    alignItems='center'
                    sx={{
                      background: `url(${char_img_paths[img_key]}) no-repeat center, 'rgb(237,237,237)'`,
                      background: `linear-gradient(rgba(0,0,0,0.4) 100%, rgba(0,0,0,0.4) 100%), url(${char_img_paths[img_key]}) no-repeat center, radial-gradient(circle, rgba(237,237,237,1) 0%, rgba(120,120,120,1) 100%)`,
                      backgroundSize: 'contain, contain, auto auto',
                      padding: '16px',
                      paddingBottom: index === charMemory.length - 2 ? '32px' : '16px',
                      paddingTop: index === charMemory.length - 2 ? '16px' : '32px',
                      minHeight: '50vh',
                      borderBottom: index === charMemory.length - 2 ? '1px solid black' : ''
                    }}
                  >
                    {index === charMemory.length - 2 ? (
                      <>
                        <Stack direction='row' justifyContent='space-between' sx={{ width: '100%' }}>
                          <Typography variant='body0'>
                            High Score: {highScore}
                          </Typography>
                          <Typography variant='body0'>
                            Score: {curScore}
                          </Typography>
                        </Stack>
                        <Typography variant='h5' fontWeight='bold' textAlign='center' py={2}>
                          Which Operator (E2Lv1) has higher {available_stats[curStat]}?
                        </Typography>
                        <Stack alignItems='center' mt='auto'>
                          <Typography variant='h6'>
                            {char_stats[char]['name']}
                          </Typography>
                          <Typography variant='h6'>
                            {available_stats[curStat]}
                          </Typography>
                          {roundResult !== -1 && (
                            <CountUp
                              start={parseInt(solutionStats.at(-2) * 0.75)}
                              end={solutionStats.at(-2)}
                              delay={0}
                              duration={1}
                              decimals={curStat === 'baseAttackTime' ? 1 : 0}
                            >
                              {({ countUpRef }) => (
                                <Typography ref={countUpRef} variant='h4' />
                              )}
                            </CountUp>
                          )}
                        </Stack>
                      </>
                    ) : (
                      <>
                        <Stack alignItems='center'>
                          {roundResult !== -1 && (
                            <CountUp
                              start={parseInt(solutionStats.at(-1) * 0.75)}
                              end={solutionStats.at(-1)}
                              delay={0}
                              duration={1}
                              decimals={curStat === 'baseAttackTime' ? 1 : 0}
                            >
                              {({ countUpRef }) => (
                                <Typography ref={countUpRef} variant='h4' />
                              )}
                            </CountUp>
                          )}
                          <Typography variant='h6'>
                            {available_stats[curStat]}
                          </Typography>
                          <Typography variant='h6'>
                            {char_stats[char]['name']}
                          </Typography>
                        </Stack>
                        <Stack my='auto' spacing={2}>
                          {[-2, -1].map(j => (
                            <Button key={j} variant='outlined' onClick={onClickSol} disabled={roundResult === -1 ? false : true}
                              sx={{ color: 'white', border: '2px solid white', borderRadius: '8px', fontSize: '1rem' }}
                            >
                              {char_stats[charMemory.at(j)]['name']}
                            </Button>
                          ))}
                        </Stack>
                      </>
                    )}
                  </Stack>
                </Collapse>
              );
            })
          }
        </TransitionGroup>
      )}
      {!isGameover && (
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          borderRadius: '50%',
          width: '3rem',
          height: '3rem',
          transform: 'translate(-50%, -50%)',
          backgroundColor: roundResult ? roundResult === 1 ? 'rgb(75,181,67)' : '#fff' : '#f44336',
          transition: theme.transitions.create(['background-color'], { duration: 1500 })
        }}>
          <Box sx={{
            color: 'black',
            textAlign: 'center',
            verticalAlign: 'middle',
            display: 'table-cell',
            fontSize: '1.1rem',
            fontWeight: '700',
            height: '3rem',
            width: '3rem',
          }}>
            VS
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LowerHigher;