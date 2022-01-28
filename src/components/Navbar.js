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

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = { 'Home': '/', 'Games': '/games' };
  return (
    <AppBar position='static'>
      <Container>
        <Toolbar >
          <Typography
            variant='h5'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 2, display: {xs: 'none', md: 'flex'}, justifyContent: 'center' }}>
            {
              Object.keys(pages).map(page => (
                <Button
                  key={page}
                  component={Link}
                  to={pages[page]}
                  sx={{ fontSize: 'body1.fontSize', display: 'block', color: 'white', mx: 1 }}
                >
                  {page}
                </Button>
              ))
            }
          </Box>
          <Typography
            noWrap
            sx={{ flexGrow: 1, display: {xs: 'none', md: 'flex'}, justifyContent: 'end' }}
            component='div'
          >
            Logout
          </Typography>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {Object.keys(pages).map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography component={Link} to={pages[page]} textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;