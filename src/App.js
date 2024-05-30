import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import AddProducts from './components/AddProducts/AddProducts';
import DetailProducts from './components/DetailProducts/DetailProducts';
import Carts from './components/Carts/Carts';
import DetailOrders from './components/DetailOrders/DetailOrders';
import Orders from './components/Orders/Orders';
import Products from './components/Products/Products';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={SignUp}/>
        <Route path="/home" Component={Home}/>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/add-products" Component={AddProducts} />
        <Route path="/products"  Component={Products}/>
        <Route path="/products/:productId" element={<DetailProducts />} />
        <Route path="/carts" Component={Carts} />
        <Route path="/orders" Component={Orders} />
        <Route path="/orders/:orderId" element={<DetailOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
