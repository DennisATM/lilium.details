import { useState} from "react";
import {ShoppingBagIcon } from "@heroicons/react/24/solid";
import { useCart } from "../context/CartContex";

export const CartDropdown = () => {
  const [open, setOpen] = useState(false);
  const {cart, removeFromCart} = useCart(); 

  return (
    <div className="relative">
      {/* Icono carrito */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-gray-700 hover:text-black"
      >
        <ShoppingBagIcon className="h-6 w-6" />
        {cart.length > 0 && (
          <span className="absolute -top-0 -right-0 bg-amber-500 text-white text-xs rounded-full px-1">
            {cart.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {/* {open && (
        <div className="absolute -right-24 mt-2 w-60 md:w-84 bg-gradient-to-r from-emerald-50 to-white text-xs md:text-sm shadow-lg rounded-lg p-4 z-50">
          <h3 className="font-bold mb-2">Tu Bolsa</h3>
          {cart.length === 0 ? (
            <>
              <p className="text-gray-500">Bolsa vacía</p>
              <button className="mt-3 w-full bg-emerald-400 text-white py-1 rounded-lg hover:bg-emerald-500">
                Ir a la tienda
              </button>
            </>

          ) : (
            <>
            <ul className="divide-y">
              {cart.map((item) => (
                <li key={item.id} className="py-2 row flex items-center justify-between ">
                  
                    <div className="col-3">
                      <span className="mr-10">
                      🛍️ {item.quantity}
                      </span>
                      <span className="">
                          {item.name}
                      </span>
                    </div>
                    <div className="col-2">
                      ${item.price * item.quantity}
                    </div>  
                </li>
              ))}
            </ul>
          <button className="mt-3 w-full bg-blue-600 text-white py-1 rounded-lg hover:bg-blue-700">
            Crear pedido
          </button>
          </>
          )}
        </div>
      )} */}
    </div>
  );
};