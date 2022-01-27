import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Games from './Games/Games';
import GameBoard from './GameBoard/GameBoard';

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <Box sx={{ my: 2 }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/games' element={<Games />} />
          <Route path='/games/:sub' element={<GameBoard />} />
          <Route path='*' element={<main><p>There's nothing here</p></main>} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;