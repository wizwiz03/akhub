import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <div className='nav-left'>
        <div className='logo'>
          LOGO
        </div>
      </div>
      <div className='nav-center'>
        <ul className='site-nav'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/games'>Games</Link>
          </li>
        </ul>
      </div>
      <div className='nav-right'>
        <div>
          Logout
        </div>
      </div>
    </nav>
  );
}

export default Navbar;