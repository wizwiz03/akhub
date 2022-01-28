import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Games from './Games/Games';
import GameBoard from './GameBoard/GameBoard';

const App = () => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  });
  return (
    <CookiesProvider>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Navbar />
          <Container sx={{ my: 2 }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/games' element={<Games />} />
              <Route path='/games/skill_quiz' element={<GameBoard />} />
              <Route path='*' element={<main><p>There's nothing here</p></main>} />
            </Routes>
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;