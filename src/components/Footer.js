import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';
import RedditIcon from '@mui/icons-material/Reddit';

const Footer = () => {
  const theme = useTheme();
  return (
    <Box py={3} sx={{
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.shadows[4],
      backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))'
    }}>
      <Stack justifyContent='space-around' alignItems='center'>
        <Typography>Made by wizwiz03</Typography>
        <Stack>
          <Typography>For Bugs and Suggestions: </Typography>
          <Stack direction='row' spacing={4} justifyContent='center'>
            <Button
              href='https://github.com/wizwiz03/akhub'
              target='_blank'
              rel='noopener'
              aria-label='github repo link'
              size='large'
            >
              <GitHubIcon />
            </Button>
            <Button
              href='https://reddit.com/r/arknights/comments/snj06l/i_present_you_arknights_hub_a_website_with_fun/'
              target='_blank'
              rel='noopener'
              aria-label='reddit thread link'
              size='large'
            >
              <RedditIcon />
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Footer;