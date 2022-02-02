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

const HigherLower = () => {

  const importAll = (r) => {
    return r.keys().reduce((prev, cur) => {
      prev[cur.replace('./', '').replace('.png', '')] = r(cur);
      return prev;
    }, {})
  }

  const char_img_paths = importAll(require.context('./assets/images/characters_min_512', false, /\.(png|jpe?g|svg)$/));


  return (
    <Container sx={{minHeight: '100vh'}}>
      <Box
        component='img'
        src={char_img_paths[Object.keys(char_img_paths)[1]]}
        sx={{width: '100%', height: '50%'}}
      >

      </Box>
      <Box
        component='img'
        src={char_img_paths[Object.keys(char_img_paths)[3]]}
        sx={{width: '100%', height: '50%'}}
      >

      </Box>
    </Container>
  );
};

export default HigherLower;