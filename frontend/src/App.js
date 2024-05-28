import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ShippingAddressPage from './pages/ShippingAddressPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import ProductCreatePage from './pages/ProductCreatePage';
import OrderListPage from './pages/OrderListPage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Footer from './components/Footer';
import CustomNavbar from './components/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container';
import { useState, useContext } from 'react';
import { Store } from './store';
import SearchPage from './pages/SearchPage';


function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const logoutHandler = () => {
    ctxDispatch({ type: 'USER_LOGOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/login';
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
      <ToastContainer position="bottom-center" limit={1} />
        <header>
        <CustomNavbar/>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/shipping" element={<ShippingAddressPage />} />
              <Route path="/payment" element={<PaymentMethodPage />} />
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route path="/order/:id" element={<ProtectedRoute><OrderPage /></ProtectedRoute>} />
              <Route path="/orderhistory" element={<ProtectedRoute><OrderHistoryPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/" element={<HomePage />} />

              <Route path="/admin/dashboard" element={<AdminRoute><DashboardPage /></AdminRoute>} />
              <Route path="/admin/products" element={<AdminRoute><ProductListPage /></AdminRoute>} />
              <Route path="/admin/product/:id" element={<AdminRoute><ProductEditPage /></AdminRoute>} />
              <Route path="/admin/product/create" element={<AdminRoute><ProductCreatePage /></AdminRoute>} />
              <Route path="/admin/orders" element={<AdminRoute><OrderListPage /></AdminRoute>} />
              <Route path="/admin/users" element={<AdminRoute><UserListPage /></AdminRoute>} />
              <Route path="/admin/user/:id" element={<AdminRoute><UserEditPage /></AdminRoute>} />
            </Routes>
          </Container>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;