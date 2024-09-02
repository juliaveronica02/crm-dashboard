import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import Dashboard from './pages/dashboard';
import Product from './components/product';

function App() {
  return (
    <div className="d-flex">
      <Router>
      <Sidebar />
      <div id="page-content-wrapper">
        <Navbar />
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Product />} />
          </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;