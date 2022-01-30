import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const Navbar = () => {
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