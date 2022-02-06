import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CardActionArea } from '@mui/material';

import Footer from './Footer';

import game_list from './assets/data/game_list.json';
import lh_img from './assets/images/games/lh_thumbnail_356.jpg';
import pg_img from './assets/images/games/pg_thumbnail_356.jpg';
import sq_img from './assets/images/games/sq_thumbnail_356.jpg';

const Games = () => {
  const thumbnails = { 'lower_higher': lh_img, 'profile_guesser': pg_img, 'skill_quiz': sq_img };
  return (
    <>
      <Container sx={{ py: 3 }}>
        <Typography variant='h2' textAlign='center' gutterBottom fontWeight={500}>
          Games
        </Typography>
        <Divider />
        <Stack flexDirection='row' justifyContent='center' flexWrap='wrap' sx={{ py: 4, gap: '32px' }}>
          {
            game_list.map((game, i) => (
              <Card key={i} component={Link} to={`/games/${game.sub}`} sx={{ textDecoration: 'none' }}>
                <CardActionArea sx={{ '&:hover': { backgroundColor: '#404040'} }}>
                  <CardMedia
                    component='img'
                    image={thumbnails[game.sub]}
                    alt={game.alt}
                    sx={{ objectFit: 'contain', height: {xs: '168px', sm: '200px'} }}
                  />
                  <CardContent sx={{ minHeight: '200px', width: {xs: '300px', sm: '350px'} }}>
                    <Typography gutterBottom variant='h5' component='div'>
                      {game.title}
                    </Typography>
                    <Typography color='text.secondary'>
                      {game.descrAlt}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          }
        </Stack>
      </Container>
      <Footer />
    </>
  );
}

export default Games;