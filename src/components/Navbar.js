import { Link } from 'react-router-dom';
import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import HomeIcon from '@mui/icons-material/Home';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

const Navbar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (e, newVal) => {
    setValue(newVal);
  };

  const pages = { 'Home': '/', 'Games': '/games' };
  return (
    <AppBar position='static'>
      <Container>
        <Toolbar>
          <Grid container alignItems='center'>
            <Grid item xs={1}>
              <Typography
                variant="h5"
                component="div"
              >
                LOGO
              </Typography>
            </Grid>
            <Grid item xs={10} container justifyContent='center'>
              {
                Object.keys(pages).map(page => (
                  <Button
                    key={page}
                    sx={{ mx: {xs: 0, sm: 1}, color: 'white', fontSize: {xs: '1rem'} }}
                    component={Link}
                    to={pages[page]}
                  >
                    {page}
                  </Button>
                ))
              }
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;