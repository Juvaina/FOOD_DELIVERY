import { Route, Routes } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import ClientLayout from './components/layout/ClientLayout';
import List from './pages/Admin/List/List';
import Orders from './pages/Admin/Orders/Orders';
import Cart from './pages/Client/Cart/Cart';
import Home from './pages/Client/Home/Home';
import MyOrders from './pages/Client/MyOrders/MyOrders';
import PlaceOrder from './pages/Client/PlaceOrder/PlaceOrder';
import Verify from './pages/Client/Verify/Verify';

const App = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  return (
    <Routes>
      {/* Client Layout */}
      <Route path='/' element={<ClientLayout />}>
        <Route index element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/myorders' element={<MyOrders />} />
      </Route>
      {/* Client Layout */}
      <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<List url={url} />} />
        <Route path='/admin/orders' element={<Orders url={url} />} />
      </Route>
    </Routes>
  );
};

export default App;

