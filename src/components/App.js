import { Outlet } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

import './Base.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <div id='main-outlet'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
