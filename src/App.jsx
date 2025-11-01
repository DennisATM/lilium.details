import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from "./components/Navbar";
import { NavbarAdmin } from "./components/NavbarAdmin";
import { Footer } from "./components/Footer";
import { Home } from "./pages/HomePage/Home";
import { ProductDetail } from './pages/ProductDetail/ProductDetail';
import { Shopee } from './pages/ShopeePage/Shopee';
import { TopBar } from './components/topBar';
import { Contact } from './pages/ContactPage/Contact';
import { Login } from './pages/LoginPage/login';
import { Dashboard } from './pages/dashboardPage/dashboard';
import { Cart } from "./pages/CartPage/Cart";
import { FloatButton } from "./components/FloatButton";
import { Checkout } from "./pages/CheckoutPage/Checkout.jsx";
import { ProdAdmin } from "./pages/ProdAdmin/ProductAdmin.jsx";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Actualiza el estado cuando cambia el token en localStorage
  useEffect(() => {
    const onStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', onStorageChange);
    return () => window.removeEventListener('storage', onStorageChange);
  }, []);

  // Actualiza el estado tras login/logout en la misma pestaña
  useEffect(() => {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
      originalSetItem.apply(this, arguments);
      if (key === 'token') {
        window.dispatchEvent(new Event('storage'));
      }
    };
    return () => {
      localStorage.setItem = originalSetItem;
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen">
        
        {!token ? <>
        <TopBar />
        <Navbar /> 
        </>
        : <NavbarAdmin setToken={setToken}/>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shopee" element={<Shopee />} />
          <Route path="/detailProduct/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/products" element={<ProdAdmin />} />
        </Routes>
        <FloatButton />
        <Footer />
      </div>
    </Router>
  );
}

export default App;