import React from 'react';
import { BrowserRouter  as Router, Routes, Route } from "react-router-dom";
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import Dashboard from './pages/dashboard';
import Product from './pages/product';
import Accounting from './pages/accounting';

function App() {
  return (
    <div className="d-flex">
      <Router>
      <Sidebar />
      <div id="page-content-wrapper">
        <Navbar />
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Product />} />
            <Route path="/accounting" element={<Accounting />} />
          </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;