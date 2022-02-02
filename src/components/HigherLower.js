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

import char_stats from './assets/data/char_stats.json';

const HigherLower = () => {

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

  const get_random_char = () => {
    return char_codes[parseInt(char_codes.length * Math.random())];
  };

  const get_random_stat = () => {
    return stat_codes[parseInt(stat_codes.length * Math.random())];
  };

  const load_new_round = () => {
    let char_1 = get_random_char();
    if (charMemory.length === 0) {
      let char_2 = char_1;
      while (char_2 === char_1) {
        char_2 = get_random_char();
      }
      setCharMemory([char_1, char_2]);
    }
    else {
      while (char_1 === charMemory.at[-1]) {
        char_1 = get_random_char();
      }
      setCharMemory([...charMemory, char_1]);
    }
    setCurStat(get_random_stat());
  };

  useEffect(() => {
    load_new_round();
  }, []);

  return (
    <Container sx={{ minHeight: '100vh',padding: 0 }}>
      <TransitionGroup>
        {
          charMemory.map((char, index) => {
            if (index < charMemory.length - 2) {
              return null;
            }
            const img_key = char + '_2';
            return (
              <Collapse key={index} sx={{height: '100%'}}>
                <Box
                  sx={{
                    background: 'rgb(237,237,237)',
                    background: `url(${char_img_paths[img_key]}) no-repeat center / cover`,
                    background: `url(${char_img_paths[img_key]}) no-repeat center, radial-gradient(circle, rgba(237,237,237,1) 0%, rgba(120,120,120,1) 100%)`,
                    backgroundSize: 'contain, auto auto'
                  }}
                >
                  {index === charMemory.length - 2 ? (
                    <Stack
                      alignItems='center'
                      py={2}
                      sx={{ height: '50vh', backgroundColor: 'rgba(0,0,0,0.4)', borderBottom: '1px solid black' }}
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
                        <Typography>
                          {char_stats[char]['name']}
                        </Typography>
                        <Typography>
                          {available_stats[curStat]}
                        </Typography>
                      </Stack>
                      <Box sx={{
                        position: 'absolute',
                        top: '55%',
                        backgroundColor: '#fff',
                        borderRadius: '50%',
                        width: '3rem',
                        height: '3rem'
                      }}>
                        
                      </Box>
                    </Stack>
                  ) : (
                    <Stack
                      alignItems='center'
                      py={2}
                      sx={{ height: '50vh', backgroundColor: 'rgba(0,0,0,0.4)' }}
                    >
                      <Stack alignItems='center'>
                        <Typography>
                          {available_stats[curStat]}
                        </Typography>
                        <Typography>
                          {char_stats[char]['name']}
                        </Typography>
                      </Stack>
                      <Stack my='auto' spacing={2}>
                        <Button variant='outlined' sx={{ color: 'white', border: '2px solid white', borderRadius: '8px' }}>
                          {char_stats[charMemory.at(-2)]['name']}
                        </Button>
                        <Button variant='outlined' sx={{ color: 'white', border: '2px solid white', borderRadius: '8px' }}>
                          {char_stats[char]['name']}
                        </Button>
                      </Stack>
                    </Stack>
                  )
                  }
                </Box>
              </Collapse>
            );
          })
        }
      </TransitionGroup>
    </Container>
  );
};

export default HigherLower;