import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ReplayIcon from '@mui/icons-material/Replay';

const Gameover = ({ score_results, score, playAgain }) => {
  const importAll = (r) => {
    return r.keys().reduce((prev, cur) => {
      prev[cur.replace('./', '').replace('.png', '')] = r(cur);
      return prev;
    }, {})
  }

  const stickers = {
    bad: importAll(require.context('./assets/images/gameover/bad', false, /\.(png|jpe?g|svg)$/)),
    decent: importAll(require.context('./assets/images/gameover/decent', false, /\.(png|jpe?g|svg)$/)),
    great: importAll(require.context('./assets/images/gameover/great', false, /\.(png|jpe?g|svg)$/))
  };

  const gameover_text = {
    bad: 'Looks like you have lost. You can\'t stop like this... You can do better! How about another try?',
    decent: 'Not bad. You seem to know a thing or two. Or you are just lucky... The only way to find out is to play more!',
    great: 'Wow, that\'s a nice score. Good Job! Here have a happy sticker as your reward.'
  };

  const result = score <= score_results['bad'] ? 'bad' : score <= score_results['decent'] ? 'decent' : 'great';

  return (
    <Paper elevation={8} sx={{ padding: '24px 8px', flex: 1 }}>
      <Stack alignItems='center' spacing={2}>
        <Typography variant='h2'>Your final score:</Typography>
        <Typography variant='h1'>{score}</Typography>
        <Typography variant='p' textAlign='center'>
          {gameover_text[result]}
        </Typography>
        <Button variant='contained' endIcon={<ReplayIcon />} onClick={playAgain} sx={{ borderRadius: '8px' }}>
          Play Again
        </Button>
        <Box component='img' alt='lost game image' sx={{ width: '256px' }}
          src={Object.values(stickers[result])[parseInt(Object.keys(stickers[result]).length*Math.random())]}
        />
      </Stack>
    </Paper>
  );
}

export default Gameover;