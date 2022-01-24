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
            <a href=''>Home</a>
          </li>
          <li>
            <a href=''>Games</a>
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