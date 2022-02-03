import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ReplayIcon from '@mui/icons-material/Replay';

import Footer from './Footer';

import gameover_img from '../dump/lost_1.png';

const Gameover = ({ curScore, playAgain }) => {
  return (
    <>
      <Paper elevation={8} sx={{ padding: '16px 0' }}>
        <Stack alignItems='center' spacing={2}>
          <Typography variant='h2'>Your final score:</Typography>
          <Typography variant='h1'>{curScore}</Typography>
          <Typography variant='p' textAlign='center'>
            Looks like you have lost. You can't stop like this... How about another try?
          </Typography>
          <Button variant='contained' endIcon={<ReplayIcon />} onClick={playAgain}>
            Play Again
          </Button>
          <Box component='img' src={gameover_img} alt='lost game image' sx={{ width: '256px' }} />
        </Stack>
      </Paper>
      <Footer />
    </>
  );
}

export default Gameover;