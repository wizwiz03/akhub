import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import createCustomTheme from './theme';
import ScrollToTop from './ScrollToTop';
import Navbar from './Navbar';
import Home from './Home';
import Games from './Games';
import GameBoard from './SkillQuiz';
import ProfileGuesser from './ProfileGuesser';
import LowerHigher from './LowerHigher';
import HTTP404 from './HTTP404';

const App = () => {
  return (
    <CookiesProvider>
      <ThemeProvider theme={createCustomTheme()}>
        <BrowserRouter>
          <CssBaseline />
          <ScrollToTop />
          <Paper elevation={8} sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/games' element={<Games />} />
              <Route path='/games/skill_quiz' element={<GameBoard />} />
              <Route path='/games/profile_guesser' element={<ProfileGuesser />} />
              <Route path='/games/lower_higher' element={<LowerHigher />} />
              <Route path='*' element={<HTTP404 />} />
            </Routes>
          </Paper>
        </BrowserRouter>
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;