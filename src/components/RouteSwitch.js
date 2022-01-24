import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Games from './Games/Games';

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='games' element={<Games />} />
          <Route path='*' element={<main><p>There's nothing here</p></main>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default RouteSwitch;