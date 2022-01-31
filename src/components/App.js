import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import createTheme from '@mui/material/styles/createTheme';
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Games from './Games';
import GameBoard from './SkillQuiz';
import ProfileGuesser from './ProfileGuesser';

const App = () => {
  let darkTheme = createTheme({
    palette: {
      mode: 'dark'
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontSize: '1rem',
            fontWeight: 400
          },
          head: {
            fontSize: '1.2rem'
          }
        }
      }
    }
  });
  darkTheme = responsiveFontSizes(darkTheme);
  return (
    <CookiesProvider>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Navbar />
          <Box pb={2}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/games' element={<Games />} />
              <Route path='/games/skill_quiz' element={<GameBoard />} />
              <Route path='/games/profile_guesser' element={<ProfileGuesser />} />
              <Route path='*' element={<main><p>There's nothing here</p></main>} />
            </Routes>
          </Box>
          <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;