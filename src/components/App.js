import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Games from './Games/Games';
import GameBoard from './GameBoard/GameBoard';

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/games' element={<Games />} />
        <Route path='/games/:sub' element={<GameBoard />} />
        <Route path='*' element={<main><p>There's nothing here</p></main>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;