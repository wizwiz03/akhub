import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  const theme = useTheme();
  return (
    <Box py={2} sx={{
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.shadows[4],
      backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))'
      }}>
      <Stack justifyContent='space-around' alignItems='center'>
        <Typography>Made by wizwiz03</Typography>
        <Stack>
          <Typography>For Bugs and Suggestions: </Typography>
          <Button
            href='https://github.com/wizwiz03/akhub'
            target='_blank'
            aria-label='github repo link'
            size='large'
          >
            <GitHubIcon />
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Footer;