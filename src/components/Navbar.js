import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';

const Navbar = () => {
  const pages = { 'Home': '/', 'Games': '/games' };
  return (
    <AppBar position='static'>
      <Container px={0}>
        <Toolbar>
          <Grid container alignItems='center'>
            <Grid item xs='auto' sm={3}>
              <Typography variant='h5' component={Link} to='/'
                sx={{ display: { xs: 'none', sm: 'block' }, textDecoration: 'none', color: 'white' }}
              >
                Arknights Hub
              </Typography>
              <Typography variant='h5' component='div' sx={{ display: { xs: 'block', sm: 'none' }, paddingRight: '8px' }}>
                AKHub
              </Typography>
            </Grid>
            <Grid item xs container sx={{ justifyContent: { xs: 'start', sm: 'center' } }}>
              {
                Object.keys(pages).map(page => (
                  <Button
                    key={page}
                    component={Link}
                    to={pages[page]}
                    sx={{ color: '#fff', fontSize: '1rem' }}
                  >
                    {page}
                  </Button>
                ))
              }
            </Grid>
            <Grid item xs={0} sm={3} />
          </Grid>
        </Toolbar>
      </Container>
    </AppBar >
  );
}

export default Navbar;