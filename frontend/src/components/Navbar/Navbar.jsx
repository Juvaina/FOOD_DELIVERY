import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import './Navbar.css';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');

  const {
    getTotalCartAmount,
    token,
    setToken,
    clearCart,
    userName,
    setUserName
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUserName('');
    clearCart();
    navigate('/');
  };
  return (
    <div className='navbar'>
      <Link to='/'>
        <img src={assets.logo} alt='' className='logo' />
      </Link>
      <ul className='navbar-menu'>
        <Link
          to='/'
          onClick={() => setMenu('home')}
          className={menu === 'home' ? 'active' : ''}
        >
          home
        </Link>
        <a
          href='#explore-menu'
          onClick={() => setMenu('menu')}
          className={menu === 'menu' ? 'active' : ''}
        >
          menu
        </a>
        <a
          href='#app-download'
          onClick={() => setMenu('mobile-app')}
          className={menu === 'mobile-app' ? 'active' : ''}
        >
          mobile-app
        </a>
        <a
          href='#footer'
          onClick={() => setMenu('contact-us')}
          className={menu === 'contact-us' ? 'active' : ''}
        >
          contact us
        </a>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt='' />
        <div className='navbar-search-icon'>
          <Link to='./cart'>
            <img src={assets.basket_icon} alt='' />
          </Link>

          <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <span className='navbar-username'>{userName}</span>
            <ul className='navbar-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt='' />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt='' />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
