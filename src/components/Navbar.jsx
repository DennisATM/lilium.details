import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContex";

import {
  ArrowRightOnRectangleIcon,
  ShoppingBagIcon,
  UserPlusIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export const Navbar = ()=> {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { cart} = useCart();
  const navigate = useNavigate();

  // Mantener cartCount sincronizado con el contexto (cart) y con eventos entre componentes/pestañas
  useEffect(() => {
    setCartCount(Array.isArray(cart) ? cart.length : 0);
  }, [cart]);

  useEffect(() => {
    // inicializar desde localStorage si hace falta
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount((prev) => (prev > 0 ? prev : stored.length));

    const onCartUpdated = (e) => {
      const newCart = (e?.detail ?? JSON.parse(localStorage.getItem("cart"))) || [];
      setCartCount(newCart.length);
    };

    window.addEventListener("cartUpdated", onCartUpdated);
    window.addEventListener("storage", onCartUpdated);

    return () => {
      window.removeEventListener("cartUpdated", onCartUpdated);
      window.removeEventListener("storage", onCartUpdated);
    };
  }, []);

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // además notificar a otros componentes en esta pestaña
    // window.dispatchEvent(new CustomEvent("cartUpdated", { detail: JSON.parse(localStorage.getItem("cart")) || [] }));
    navigate('/');
  };

  return (
    <>
      <nav className="bg-gray-50 transparent shadow-md sticky top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 m-auto">
            {/* Logo y links */}
            <div className="flex">
              <div className="flex-shrink-0 flex items-center md:mr-30">
                <Link to="/" className="xs:text-2xl md:text-3xl font-bold text-emerald-400 flex items-center ms-madi-regular">
                  <img src="../../public/imgBases/logolilium.jpg" alt="" className="w-15 @max-sm:hidden h-15 rounded-full mr-10" /> <span className="hidden sm:block">Lilium.detalles</span>
                </Link>
              </div>
              <div className="hidden md:flex md:ml-20 md:space-x-8 ms-madi-regular font-bold ">
                <Link to="/" className="inline-flex items-center px-1 pt-1 .satisfy-regular text-2xl font-medium text-gray-700 hover:text-emerald-300">Home</Link>
                <Link to="/shopee" className="inline-flex items-center px-1 pt-1 text-2xl font-medium text-gray-700 hover:text-emerald-300">Tienda en línea</Link>
                <Link to="/contact" className="inline-flex items-center px-1 pt-1 text-2xl font-medium text-gray-700 hover:text-emerald-300">Contacto</Link>
              </div>
            </div>

            {/* Iconos */}
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="text-gray-600 hover:text-emerald-300 relative">
                <ShoppingBagIcon className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-amber-500 text-white text-xs rounded-full px-1">
                    {cartCount}
                  </span>
                )}
              </Link>

              {!token ? (
                <Link to="/login" className="text-gray-600 hover:text-emerald-300">
                  <UserPlusIcon className="h-6 w-6" />
                </Link>
              ) : (
                <button onClick={handleLogout} className="text-gray-600 hover:text-emerald-300" title="Cerrar sesión">
                  <ArrowRightOnRectangleIcon className="h-6 w-6" />
                </button>
              )}
            </div>

            {/* Menú hamburguesa en mobile */}
            <div className="-mr-2 flex items-center md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-emerald-300 hover:bg-gray-100">
                {isOpen ? <XMarkIcon className="block h-6 w-6" /> : <Bars3Icon className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menú desplegable en mobile */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md ms-madi-regular text-2xl">
            <div className="pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-300">Home</Link>
              <Link to="/shopee" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-300">Tienda en línea</Link>
              <Link to="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-300">Contacto</Link>
            </div>
          </div>
        )}
      </nav>
      <style>{`Link:{font-family:"Monotype"}`}</style>
    </>
  );
}