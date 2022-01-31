import { useState, useEffect, Fragment } from 'react';
import { useCookies } from 'react-cookie';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import game_list from './assets/data/game_list.json';
import profile_table from './assets/data/profile_table.json';
import opname_to_code from './assets/data/opname_to_code.json';
import handbook_team_table from './assets/data/handbook_team_table.json';


const ProfileGuesser = () => {
  const [cookies, setCookie] = useCookies(['hs_pg']);
  const game = game_list.find(mode => mode['sub'] === 'profile_guesser');

  const importAll = (r) => {
    return r.keys().reduce((prev, cur) => {
      prev[cur.replace('./', '').replace('.png', '')] = r(cur);
      return prev;
    }, {})
  }

  // { 'char_002_amiya_1': <webpack_img_path>, 'char_003_kalts_1': <webpack_img_path>, ... }
  const avatar_img_paths = importAll(require.context('./assets/images/avatars', false, /\.(png|jpe?g|svg)$/));
  const char_names = Object.keys(opname_to_code);

  const [userInput, setUserInput] = useState(null);
  const [randNum, setRandNum] = useState(0);
  const [dupeNums, setDupeNums] = useState([]);
  const [operatorCode, setOperatorCode] = useState('char_500_noirc');
  const [curScore, setCurScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [roundResult, setRoundResult] = useState(-1);

  const set_rand_profile = () => {
    let random_number;
    for (let i = 0; i < 50; i++) {
      random_number = parseInt(Object.keys(profile_table).length * Math.random());
      if (!dupeNums.includes(random_number)) {
        break;
      }
    }
    setRandNum(random_number);
    setOperatorCode(Object.keys(profile_table)[random_number]);
    setDupeNums([...dupeNums, random_number]);
    console.log(opname_to_code[Object.keys(profile_table)[random_number]]);
  };

  useEffect(() => {
    set_rand_profile();
    if (cookies.hs_pg) {
      setHighScore(cookies.hs_pg);
    }
  }, []);

  const load_new_round = () => {
    setShowSolution(false);
    setUserInput(null);
    set_rand_profile();
    setRoundResult(-1);
  };

  useEffect(() => {
    let timer = null;
    if (roundResult === 1) {
      console.log('Timeout triggered');
      setCurScore(curScore + 1);
      timer = setTimeout(load_new_round, 3000);
    }
    return () => clearTimeout(timer);
  }, [roundResult]);

  const processRound = (val) => {
    setShowSolution(true);
    const win_con = opname_to_code[val] === operatorCode;
    if (win_con) {
      setRoundResult(1);
    }
    else {
      setRoundResult(0);
      if (curScore > highScore) {
        setHighScore(curScore);
        setCookie('hs_pg', curScore, { path: '/' });
      }
    }
  };

  const onSubmit = (e, val) => {
    if (val) {
      setUserInput(val);
      processRound(val);
    }
  };

  const create_profile_story_table = () => {
    return (
      <TableContainer>
        <Table aria-label='profile table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                Profile Story
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                {profile_table[operatorCode]['profile']}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const create_profile_stats_table = () => {
    const format_stats_table = (stat, i) => {
      if (stat === 'Code Name' || stat === 'Model') {
        return null;
      }
      if (stat === 'Infection Status') {
        return (
          <Fragment key={`${stat}${i}`}>
            <TableRow key={`${stat}${i + 1}`}>
              <TableCell colSpan={2}>{stat}</TableCell>
            </TableRow>
            <TableRow key={`${stat}${i + 2}`}>
              <TableCell colSpan={2}>{profile_table[operatorCode]['table1'][stat]}</TableCell>
            </TableRow>
          </Fragment>
        );
      }
      return (
        <TableRow key={`${stat}${i}`}>
          <TableCell>{stat}</TableCell>
          <TableCell>{profile_table[operatorCode]['table1'][stat]}</TableCell>
        </TableRow>
      );
    };

    return (
      <TableContainer>
        <Table aria-label='profile basic stats table'>
          <TableHead>
            <TableRow>
              <TableCell align='center' colSpan={2}>
                Profile Stats
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(profile_table[operatorCode]['table1']).map(format_stats_table)}
          </TableBody>
        </Table>
      </TableContainer>
    )
  };

  const create_nation_combat_table = () => {
    const get_nation = () => {
      let res = '';
      for (const [, id] of Object.entries(profile_table[operatorCode]['nation'])) {
        if (id !== null) {
          res += handbook_team_table[id]['powerName'] + ' ';
        }
      }
      return res ? res : 'None';
    };

    return (
      <TableContainer>
        <Table aria-label='nation and combat stats table'>
          <TableHead>
            <TableRow>
              <TableCell align='center' colSpan={2}>
                Nation / Combat Stats
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Nation/Group/Team</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                {get_nation()}
              </TableCell>
            </TableRow>
            {
              Object.keys(profile_table[operatorCode]['table2']).map((stat, i) => (
                <TableRow key={`${stat}${i}`}>
                  <TableCell>{stat}</TableCell>
                  <TableCell>{profile_table[operatorCode]['table2'][stat]}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Paper elevation={8}>
      <Container sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Typography variant='h4' textAlign='center' gutterBottom>
          {game.title}
        </Typography>
        <Typography variant='h6' textAlign='center' gutterBottom>
          {game.descr}
        </Typography>
        <Stack alignItems='center'>
          <Stack direction='row' justifyContent='space-around' spacing={10}>
            <Typography variant='body2' textAlign='center' component='div'>
              {`Your High Score: ${highScore}`}
            </Typography>
            <Typography variant='body2' textAlign='center' component='div'>
              {`Current Score: ${curScore}`}
            </Typography>
          </Stack>
          <Box>
            <Autocomplete
              value={userInput}
              onChange={onSubmit}
              disablePortal
              autoHighlight
              clearOnEscape
              options={char_names}
              sx={{ maxWidth: '300px', width: '70vw' }}
              renderInput={tfProps => <TextField {...tfProps} label='Operator' sx={{ border: '1px solid rgb(250,250,250)', borderRadius: '6px' }} />}
            />
          </Box>
          {create_profile_story_table()}
          {create_profile_stats_table()}
          {create_nation_combat_table()}
        </Stack>
      </Container>
    </Paper>
  );
};

export default ProfileGuesser;