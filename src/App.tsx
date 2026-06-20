import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Store } from './pages/Store';
import { Dashboard } from './pages/Dashboard';
import { Checkout } from './pages/Checkout';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tienda" element={<Store />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}
