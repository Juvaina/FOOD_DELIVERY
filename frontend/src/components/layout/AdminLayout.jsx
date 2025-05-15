import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { assets } from '../../assets/assets';
import Sidebar from '../Sidebar/Sidebar';
import './AdminLayout.css';

const AdminLayout = () => {
  return (
    <div>
      <ToastContainer />
      <div className='navbar'>
        <img className='logo' src={assets.admin_logo} alt='' />
        <img className='profile' src={assets.profile_image} alt='' />
      </div>
      <hr />
      <div className='app-content'>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
