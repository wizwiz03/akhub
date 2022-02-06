import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ReplayIcon from '@mui/icons-material/Replay';

import gameover_img from '../dump/256_lost_1.png';

const Gameover = ({ score_results, score, playAgain }) => {
  const gameover_text = {
    bad: 'Looks like you have lost. You can\'t stop like this... You can do better! How about another try?',
    decent: 'Not bad. You seem to know a thing or two. Or you are just lucky... The only way to find out is to play more!',
    great: 'Wow, that\'s a nice score. Good Job! Here have a happy sticker as your reward.'
  };

  return (
    <Paper elevation={8} sx={{ padding: '24px 8px', flex: 1 }}>
      <Stack alignItems='center' spacing={2}>
        <Typography variant='h2'>Your final score:</Typography>
        <Typography variant='h1'>{score}</Typography>
        <Typography variant='p' textAlign='center'>
          {score <= score_results['bad'] ? gameover_text['bad'] : score <= score_results['decent'] ? gameover_text['decent'] : gameover_text['great']}
        </Typography>
        <Button variant='outlined' endIcon={<ReplayIcon />} onClick={playAgain} sx={{ borderRadius: '8px' }}>
          Play Again
        </Button>
        <Box component='img' src={gameover_img} alt='lost game image' sx={{ width: '256px' }} />
      </Stack>
    </Paper>
  );
}

export default Gameover;