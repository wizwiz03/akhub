import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Home from './Home/Home';
import Games from './Games/Games';
import GameBoard from './GameBoard/GameBoard';

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='games/:sub' element={<GameBoard />} />
          <Route path='games' element={<Games />} />
          <Route path='*' element={<main><p>There's nothing here</p></main>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default RouteSwitch;