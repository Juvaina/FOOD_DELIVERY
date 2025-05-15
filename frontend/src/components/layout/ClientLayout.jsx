import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import LoginPopup from '../LoginPopup/LoginPopup';
import Navbar from '../Navbar/Navbar';

const ClientLayout = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <Navbar setShowLogin={setShowLogin} />
      <div className='app'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default ClientLayout;
