import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import GitHubIcon from '@mui/icons-material/GitHub';

import Footer from './Footer';

import game_list from './assets/data/game_list.json';
import bgImg from './assets/images/home/akhub_home.jpg';
import gamesImg from './assets/images/home/char_002_amiya_1+.png';

const Home = () => {
  return (
    <>
      <Box
        sx={{
          margin: 0,
          width: '100vw',
          maxWidth: '100%',
          backgroundImage: `url(${bgImg})`,
          backgroundPosition: { xs: '55% 50%', sm: 'center' },
          backgroundSize: 'cover'
        }}
      >
        <Container>
          <Grid container alignItems='center' sx={{ minHeight: '85vh' }}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <Typography
                variant='h2'
                sx={{
                  textAlign: 'center',
                  fontWeight: 700,
                  backgroundColor: 'rgba(129,125,122, 0.5)',
                  color: 'rgb(255,255,255)'
                }}
              >
                Welcome to AKHub
              </Typography>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ backgroundColor: 'rgb(255,255,255)', width: '100vw', maxWidth: '100%', py: 4 }}>
        <Container>
          <Stack
            justifyContent='center'
            px={{ xs: 1, sm: 4 }}
            sx={{ minHeight: '80vh', color: '#000', flexDirection: { xs: 'column', sm: 'row' } }}
          >
            <Stack justifyContent='center' sx={{ flex: 1 }}>
              <Typography variant='h6' pb={2} pl={{ sm: 2 }} sx={{ textAlign: { xs: 'center', sm: 'start' } }}>
                How well do you know your favorite Operators?
              </Typography>
              <Typography pl={{ sm: 2 }} sx={{ textAlign: { xs: 'center', sm: 'start' } }}>
                Arknights Hub features 3 fun little Games that will test your knowledge:
              </Typography>
              <List>
                {game_list.map(game => (
                  <ListItem key={game['title']}>
                    <ListItemIcon>
                      <ArrowForwardIosRoundedIcon htmlColor='#000' />
                    </ListItemIcon>
                    <ListItemText
                      color='#000'
                      primary={game['title']}
                      secondary={game['descr']}
                      secondaryTypographyProps={{ color: 'secondary.contrastText' }}
                    />
                  </ListItem>
                ))}
              </List>
              <Button variant='outlined' component={Link} to='/games'
                sx={{ maxWidth: '300px', margin: '0 auto' }}
              >
                Check out the Games now!
              </Button>
            </Stack >
            <Box
              sx={{
                flex: 1,
                background: `url(${gamesImg}) no-repeat center`,
                backgroundSize: 'contain',
                display: { xs: 'none', sm: 'block' }
              }}
            >
            </Box>
          </Stack>
        </Container>
      </Box>
      <Box sx={{ backgroundColor: '#e5e7eb', width: '100vw', maxWidth: '100%', py: 4 }}>
        <Container sx={{ minHeight: '50vh', display: 'flex' }} component={Stack} justifyContent='center' alignItems='center'>
          <Box
            sx={{
              backgroundColor: '#3882f6',
              color: '#fff',
              py: 3,
              px: { xs: 4, md: 8 },
              borderRadius: '8px'
            }}
          >
            <Stack
              direction='row'
              justifyContent='center'
              alignItems='center'
              flexWrap='wrap'
              spacing={1}
              sx={{ width: '80vw', maxWidth: '700px' }}
            >
              <Box minWidth='240px' sx={{ flex: 3, pb: { xs: 2, md: 0 } }}>
                <Typography variant='h6' textAlign={{ xs: 'center', sm: 'start' }}>
                  Found a bug? Have some Suggestions?
                </Typography>
                <Typography variant='subtitle1' component='p' textAlign={{ xs: 'center', sm: 'start' }}>
                  Open an Issue on Github to report a bug or request features you would like to see!
                </Typography>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', justifyContent: { xs: 'center', md: 'end' } }}>
                <Button
                  endIcon={<GitHubIcon />}
                  sx={{ fontSize: '1rem', color: 'white', border: '1px solid #fff', borderRadius: '6px' }}
                  href='https://github.com/wizwiz03/akhub'
                  target='_blank'
                  rel='noopener'
                >
                  GitHub
                </Button>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default Home;