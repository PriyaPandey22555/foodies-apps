import React from 'react';
import Menubar from './components/Menubar/Menubar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import ExploreFood from './pages/ExploreFood/ExploreFood';
import FoodDetails from './pages/FoodDetails/FoodDetails';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { ToastContainer } from 'react-toastify';
import MyOrders from './pages/MyOrders/MyOrders';
import { StoreContext } from './context/StoreContext';
import Footer from './components/Footer/Footer';
import MoodChef from './pages/MoodChef/MoodChef';

const FloatingMoodBtn = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/mood-chef')}
      title="AI Mood Chef"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '28px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        cursor: 'pointer',
      }}
    >
      <div style={{
        width: '58px',
        height: '58px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #e63946, #c1121f)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '26px',
        boxShadow: '0 4px 20px rgba(230,57,70,0.5)',
        border: '3px solid white',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.12)';
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(230,57,70,0.7)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(230,57,70,0.5)';
        }}
      >
        🧑‍🍳
      </div>
      <span style={{
        fontSize: '10px',
        fontWeight: '700',
        color: '#e63946',
        letterSpacing: '0.3px',
        textShadow: '0 1px 3px rgba(0,0,0,0.15)',
      }}>
        AI Chef
      </span>
    </div>
  );
};

const App = () => {
  const { token } = useContext(StoreContext);
  return (
    <>
      <Menubar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/explore' element={<ExploreFood />} />
        <Route path='/food/:id' element={<FoodDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={token ? <PlaceOrder /> : <Login />} />
        <Route path='/login' element={token ? <Home /> : <Login />} />
        <Route path='/register' element={token ? <Home /> : <Register />} />
        <Route path='/myorders' element={token ? <MyOrders /> : <Login />} />
        <Route path='/mood-chef' element={<MoodChef />} />
      </Routes>
      <Footer />
      <FloatingMoodBtn />
    </>
  );
};

export default App;
