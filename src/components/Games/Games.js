import { Link } from 'react-router-dom';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import game_list from '../assets/data/game_list.json';
import images from '../assets/images/games/index';

const Games = () => {
  return (
    <>
      <Typography variant='h2' component='div' textAlign='center' gutterBottom>
        Games
      </Typography>
      <Container>
        <Grid container justifyContent='center' rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {
            game_list.map((game, i) => (
              <Grid key={i} item xs={10} md={5} container justifyContent='center'>
                <Card component={Link} to={`/games/${game.sub}`} sx={{ width: 450, height: 300, textDecoration: 'none' }}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='150'
                      image={images[game.img]}
                      alt={game.alt}
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        {game.title}
                      </Typography>
                      <Typography color='text.secondary'>
                        {game.descr}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </>
  );
}

export default Games;