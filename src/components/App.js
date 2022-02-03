import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import createTheme from '@mui/material/styles/createTheme';
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import Navbar from './Navbar';
import Home from './Home';
import Games from './Games';
import GameBoard from './SkillQuiz';
import ProfileGuesser from './ProfileGuesser';
import LowerHigher from './LowerHigher';

const App = () => {
  let darkTheme = createTheme({
    palette: {
      mode: 'dark'
    },
    typography: {
      body0: {
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 500,
        fontSize: '1.1rem',
        lineHeight: 1.5,
        letterSpacing: '0.00938em'
      }
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
          <Box>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/games' element={<Games />} />
              <Route path='/games/skill_quiz' element={<GameBoard />} />
              <Route path='/games/profile_guesser' element={<ProfileGuesser />} />
              <Route path='/games/lower_higher' element={<LowerHigher />} />
              <Route path='*' element={<main><p>There's nothing here</p></main>} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;