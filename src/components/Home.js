import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import GitHubIcon from '@mui/icons-material/GitHub';

import bgImg from '../dump/akhub_home_min.jpg';
import game_list from './assets/data/game_list.json';
import images from './assets/images/games/index';

const Home = () => {
  return (
    <>
      <Box
        sx={{
          margin: 0,
          width: '100vw',
          maxWidth: '100%',
          backgroundImage: `url(${bgImg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          position: 'relative'
        }}
      >
        <Container>
          <Grid container alignItems='center' sx={{ minHeight: '70vh' }}>
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
        <Container sx={{ minHeight: '70vh', color: '#000' }}>
          <Typography variant='h4' sx={{ fontWeight: 600, textAlign: 'center' }}>
            Check out these Games!
          </Typography>
          <Stack direction='row' justifyContent='space-around' spacing={2} mt={5} sx={{ flexWrap: 'wrap' }}>
            {
              game_list.map((game, i) => (
                <Stack key={i} alignItems='center' spacing={3}>
                  <Box
                    component='img'
                    src={images[game.img]}
                    alt={game.alt}
                    sx={{ height: '180px', border: '5px solid #3b82f6', borderRadius: '12px' }}
                  />
                  <Typography sx={{ maxWidth: '200px' }}>{game.title}</Typography>
                </Stack >
              ))
            }
          </Stack>
        </Container>
      </Box>
      <Box sx={{ backgroundColor: '#e5e7eb', width: '100vw', maxWidth: '100%', py: 4 }}>
        <Container sx={{ minHeight: '30vh', display: 'flex' }} component={Stack} justifyContent='center' alignItems='center'>
          <Box
            sx={{
              backgroundColor: '#3882f6',
              color: '#fff',
              py: 3,
              px: {xs: 4, md: 8},
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
              <Box minWidth='240px' sx={{ flex: 3, pb: {xs: 2, md: 0} }}>
                <Typography variant='h6' textAlign={{xs: 'center', sm: 'start'}}>
                  Found a bug? Have some Suggestions?
                </Typography>
                <Typography variant='subtitle1' component='p' textAlign={{xs: 'center', sm: 'start'}}>
                  Open an Issue on Github to report a bug or request features you would like to see!
                </Typography>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', justifyContent: {xs: 'center', md: 'end'} }}>
                <Button
                  endIcon={<GitHubIcon />}
                  sx={{ fontSize: '1rem', color: 'white', border: '1px solid #fff', borderRadius: '6px' }}
                  href='https://github.com/tnyngyhng/akhub'
                >GitHub</Button>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Home;