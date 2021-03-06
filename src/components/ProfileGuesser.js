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
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import { createFilterOptions } from '@mui/material/Autocomplete';

import Gameover from './Gameover';
import Footer from './Footer';

import game_list from './assets/data/game_list.json';
import profile_table from './assets/data/profile_table.json';
import opname_to_code from './assets/data/opname_to_code.json';
import handbook_team_table from './assets/data/handbook_team_table.json';


const ProfileGuesser = () => {
  const [cookies, setCookie] = useCookies(['hs_pg']);
  const game = game_list.find(mode => mode['sub'] === 'profile_guesser');
  const filterOptions = createFilterOptions({
    matchFrom: 'start'
  });

  const importAll = (r) => {
    return r.keys().reduce((prev, cur) => {
      prev[cur.replace('./', '').replace('.png', '')] = r(cur);
      return prev;
    }, {})
  }

  const avatar_img_paths = importAll(require.context('./assets/images/avatars_min', false, /\.(png|jpe?g|svg)$/));
  const char_names = Object.keys(opname_to_code).sort((a, b) => a.localeCompare(b));

  const [userInput, setUserInput] = useState(null);
  const [remaining, setRemaining] = useState([...Object.keys(profile_table)]);
  const [operatorCode, setOperatorCode] = useState('char_500_noirc');
  const [curScore, setCurScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [roundResult, setRoundResult] = useState(-1);
  const [solution, setSolution] = useState('char_500_noirc');
  const [isGameover, setIsGameover] = useState(false);
  const [perfectRes, setPerfectRes] = useState(false);

  const set_rand_profile = () => {
    if (remaining.length === 0) {
      setPerfectRes(true);
      setIsGameover(true);
      setRemaining([...Object.keys(profile_table)]);
      setHighScore(curScore);
      setCookie('hs_pg', curScore, { path: '/', maxAge: 100000000 });
    }
    else {
      const new_profile = remaining[parseInt(remaining.length * Math.random())];
      setOperatorCode(new_profile);
      setRemaining(remaining.filter(profile => profile !== new_profile));
    }
  };

  useEffect(() => {
    set_rand_profile();
    if (cookies.hs_pg) {
      setHighScore(cookies.hs_pg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setCurScore(curScore + 1);
      timer = setTimeout(load_new_round, 2000);
    }
    if (roundResult === 0) {
      timer = setTimeout(() => setIsGameover(true), 2000);
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundResult]);

  const processRound = (val) => {
    setShowSolution(true);
    const win_con = opname_to_code[val] === operatorCode;
    setSolution(operatorCode);
    if (win_con) {
      setRoundResult(1);
    }
    else {
      setRemaining([...Object.keys(profile_table)]);
      setRoundResult(0);
      if (curScore > highScore) {
        setHighScore(curScore);
        setCookie('hs_pg', curScore, { path: '/', maxAge: 100000000 });
      }
    }
  };

  const onSubmit = (e, val) => {
    if (val) {
      setUserInput(val);
      processRound(val);
    }
  };

  const onClickPlay = () => {
    setCurScore(0);
    setIsGameover(false);
    load_new_round();
    setPerfectRes(false);
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
      if (stat === 'Code Name') {
        return null;
      }
      if (stat === 'Infection Status' || stat === 'Inspection Report') {
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
    <>
      {isGameover ? (
        <Gameover score_results={game.scores} score={curScore} playAgain={onClickPlay} perfect_res={perfectRes} title={game.title} />
      ) : (
        <Paper elevation={8}>
          <Container sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Typography variant='h4' textAlign='center' gutterBottom>
              {game.title}
            </Typography>
            <Typography variant='h6' textAlign='center' gutterBottom>

            </Typography>
            <Stack alignItems='center' sx={{ py: 2 }}>
              <Stack direction='row' justifyContent='space-around' spacing={10}>
                <Typography variant='body2' textAlign='center' component='div'>
                  {`Your High Score: ${highScore}`}
                </Typography>
                <Typography variant='body2' textAlign='center' component='div'>
                  {`Current Score: ${curScore}`}
                </Typography>
              </Stack>
              <Box py={2}>
                <Autocomplete
                  value={userInput}
                  onChange={onSubmit}
                  disablePortal
                  autoHighlight
                  clearOnEscape
                  blurOnSelect
                  disabled={roundResult === -1 ? false : true}
                  options={char_names}
                  filterOptions={filterOptions}
                  sx={{ maxWidth: '300px', width: '70vw' }}
                  renderInput={tfProps => <TextField {...tfProps} label='Operator' sx={{ border: '1px solid rgb(250,250,250)', borderRadius: '6px' }} />}
                />
              </Box>
              <Collapse in={showSolution} unmountOnExit>
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
                  <Stack justifyContent='center' alignItems='center'>
                    <Box
                      component='img'
                      src={avatar_img_paths[solution]}
                      alt='image of operator solution'
                      mb={2}
                      sx={{ width: '128px', height: '128px' }}
                    />
                    <Typography textAlign='center'>
                      {profile_table[solution]['table1']['Code Name']}
                    </Typography>
                  </Stack>
                </Paper>
              </Collapse>
              <Grid container alignItems='stretch' sx={{ maxWidth: '950px' }}>
                <Grid item xs={12} sx={{
                  margin: '12px 0',
                  borderTop: '1px solid white',
                  borderBottom: '1px solid white'
                }}>
                  {create_profile_story_table()}
                </Grid>
                <Grid item xs={12} sm={6} sx={{
                  margin: '12px 0',
                  borderTop: '1px solid white',
                  borderBottom: '1px solid white',
                  borderRight: { xs: '', sm: '1px solid white' }
                }}>
                  {create_profile_stats_table()}
                </Grid>
                <Grid item xs={12} sm={6} sx={{
                  margin: '12px 0',
                  borderTop: '1px solid white',
                  borderBottom: '1px solid white',
                  borderLeft: { xs: '', sm: '1px solid white' }
                }}>
                  {create_nation_combat_table()}
                </Grid>
              </Grid>
            </Stack>
          </Container>
        </Paper>
      )}
      <Footer />
    </>
  );
};

export default ProfileGuesser;