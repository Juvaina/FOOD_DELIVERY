import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-options'>
        <NavLink to='/admin' className='sidebar-option'>
          <img src={assets.order_icon} alt='' />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/admin/orders' className='sidebar-option'>
          <img src={assets.order_icon} alt='' />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
