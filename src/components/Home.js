import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import bgImg from '../dump/akhub_home.jpg';
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
          <Typography variant='h4' sx={{ fontWeight: 700, textAlign: 'center' }}>
            Check out these Games!
          </Typography>
          <Stack direction='row' justifyContent='space-around' spacing={2} mt={5}>
            {
              game_list.map((game, i) => (
                <Stack key={i} alignItems='center' spacing={3} fle>
                  <Box
                    component='img'
                    src={images[game.img]}
                    alt={game.alt}
                    sx={{ height: '180px', border: '5px solid #3b82f6', borderRadius: '12px' }}
                  />
                  <Typography variant='h5' sx={{maxWidth: '200px'}}>{game.title}</Typography>
                </Stack >
              ))
            }
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default Home;