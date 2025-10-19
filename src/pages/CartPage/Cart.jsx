// import { useNavigate } from "react-router-dom";
// import { useCart } from "../../context/CartContex";
// import { useEffect, useState } from "react";

// export const Cart = () => {
//   const {cart, updateQuantity, removeFromCart, clearCart} = useCart();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if(!Array.isArray(cart)){
//         console.warn("Cart no es un array:", cart);
//     }
//   },[cart]);

//   const handleIncrease = (productId) => {
//     const item = cart.find((i) => i.id === productId);
//     if (!item) return;
//     updateQuantity(productId,(Number (item.quantity) || 0) +1);
//   };
  
//   const handleDecrease = (productId) => {
//     const item = cart.find((i) => i.id === productId);
//     if (!item) return;
//     updateQuantity(productId, (Number(item.quantity) || 0) - 1);
//   };

//   const handleRemove = (productId) => {
//     removeFromCart(productId);
//   };

//   const handleClear = () => {
//     clearCart();
//   };

//   const subtotalFor = (item) => {
//     const price = Number(item.price) || 0;
//     const qty = Number(item.quantity) || 0;
//     return price * qty;
//   };

//   const total = Array.isArray(cart) ? cart.reduce((sum, item) => sum + subtotalFor(item), 0) : 0;

//   if (!cart || cart.length === 0) {
//     return (
//         <>
//             <div className="max-w-full grid sm:grid-cols-1 bg-white md:h-80 md:grid-cols-2 gap-6 items-center h-full mx-auto p-6">
//                 <div className="flex justify-center">
//                     <video
//                     src="./imgBases/bolsa.mp4"
//                     autoPlay
//                     loop
//                     muted
//                     playsInline
//                     className="w-68 h-68 object-contain"
//                     aria-hidden="true"
//                 >
//                     {/* Fallback */}
//                     Tu navegador no soporta video.
//                 </video>
//                 </div>
//                 <div>
//                 <h2 className="text-2xl font-semibold mb-4">Tu bolsa esta vacía</h2>
//                 <p className="text-gray-600 mb-6">No hay productos agregados.</p>
//                 <button
//                     onClick={() => navigate("/shopee")}
//                     className="px-4 py-2 bg-[#6A8F6B] text-white rounded hover:bg-[#C5D1C5]"
//                 >
//                     Ir a comprar
//                 </button>
//                 </div>
//             </div>
//         </>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-semibold mb-4">Tu bolsa</h2>

//       <div className="space-y-4">
//         {cart.map((item) => (
//           <div key={item.id} className="flex items-center justify-between border rounded p-4">
//             <div className="flex items-center space-x-10 md:space-x-4">
//               {item.image && (
//                 <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
//               )}
//               <div>
//                 <div className="font-medium">{item.name || item.title || "Producto"}</div>
//                 <div className="text-sm text-gray-600">Precio: ${Number(item.price || 0)}</div>
//               </div>
//             </div>

//             <div className="flex items-center space-x-2 md:space-x-4">
//               <div className="flex items-center border rounded-3xl">
//                 <button
//                   onClick={() => handleDecrease(item.id)}
//                   className="px-3 py-1 bg-[#A5BFA4] hover:bg-gray-200 rounded-3xl"
//                   aria-label={`Disminuir ${item.name}`}
//                 >
//                   −
//                 </button>
//                 <div className="px-4">{item.quantity || 1}</div>
//                 <button
//                   onClick={() => handleIncrease(item.id)}
//                   className="px-3 py-1 bg-[#A5BFA4] hover:bg-gray-200 rounded-3xl"
//                   aria-label={`Aumentar ${item.name}`}
//                 >
//                   +
//                 </button>
//               </div>

//               <div className="w-28 text-right">
//                 <div className="font-medium">${subtotalFor(item).toFixed(2)}</div>
//                 <div className="text-sm text-gray-500">total</div>
//               </div>

//               <button
//                 onClick={() => handleRemove(item.id)}
//                 className="text-sm text-red-600 hover:underline"
//                 aria-label={`Eliminar ${item.name}`}
//               >
//                 Eliminar
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 flex justify-between items-center">
//         <div>
//           <button
//             onClick={handleClear}
//             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//           >
//             Vaciar bolsa
//           </button>
//         </div>

//         <div className="text-right">
//           <div className="text-gray-600">Subtotal</div>
//           <div className="text-2xl font-semibold">${total.toFixed(2)}</div>
//           <div className="mt-3 flex space-x-2">
//             <button
//               onClick={() => navigate("/shopee")}
//               className="px-4 py-2 border rounded hover:bg-gray-100"
//             >
//               Seguir comprando
//             </button>
//             <button
//               onClick={() => navigate("/checkout")}
//               className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
//             >
//               Ir a pagar
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContex";
import { useEffect } from "react";

export const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!Array.isArray(cart)) {
      console.warn("Cart no es un array:", cart);
    }
  }, [cart]);

  const handleIncrease = (productId) => {
    const item = cart.find((i) => i.id === productId);
    if (!item) return;
    updateQuantity(productId, (Number(item.quantity) || 0) + 1);
  };

  const handleDecrease = (productId) => {
    const item = cart.find((i) => i.id === productId);
    if (!item) return;
    updateQuantity(productId, (Number(item.quantity) || 0) - 1);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleClear = () => {
    clearCart();
  };

  const subtotalFor = (item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;
    return price * qty;
  };

  const total = Array.isArray(cart) ? cart.reduce((sum, item) => sum + subtotalFor(item), 0) : 0;

  if (!cart || cart.length === 0) {
    return (
      <>
        <div className="max-w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center h-full mx-auto p-6 bg-white">
          {/* Icono animado (mp4) */}
          <div className="flex justify-center">
            <video
              src="./imgBases/bolsa.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-40 h-40 md:w-56 md:h-56 object-contain"
              aria-hidden="true"
            >
              Tu navegador no soporta video.
            </video>
          </div>

          {/* Texto y acciones */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-4">Tu bolsa está vacía</h2>
            <p className="text-gray-600 mb-6">No hay productos agregados.</p>
            <button
              onClick={() => navigate("/shopee")}
              className="w-full md:w-auto px-4 py-2 bg-[#6A8F6B] text-white rounded hover:bg-[#5d7b5b]"
            >
              Ir a comprar
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl font-semibold mb-4">Tu bolsa</h2>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center md:items-start justify-between border rounded p-4 gap-4"
          >
            <div className="flex items-center w-full md:w-2/3 gap-4">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <div className="font-medium">{item.name || item.title || "Producto"}</div>
                <div className="text-sm text-gray-600">
                  Precio: ${Number(item.price || 0).toFixed(0)}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-1/3 justify-end">
              <div className="flex items-center border rounded-full overflow-hidden">
                <button
                  onClick={() => handleDecrease(item.id)}
                  className="px-3 py-1 bg-[#A5BFA4] hover:bg-gray-200"
                  aria-label={`Disminuir ${item.name}`}
                >
                  −
                </button>
                <div className="px-4 text-center w-12">{item.quantity || 1}</div>
                <button
                  onClick={() => handleIncrease(item.id)}
                  className="px-3 py-1 bg-[#A5BFA4] hover:bg-gray-200"
                  aria-label={`Aumentar ${item.name}`}
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <div className="font-medium">${subtotalFor(item).toFixed(0)}</div>
                <div className="text-sm text-gray-500">total</div>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="text-sm text-red-600 hover:underline"
                aria-label={`Eliminar ${item.name}`}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col md:flex-row items-center md:items-end justify-between gap-4">
        <div className="w-full md:w-auto">
          <button
            onClick={handleClear}
            className="w-full md:w-auto px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Vaciar bolsa
          </button>
        </div>

        <div className="text-right w-full md:w-auto">
          <div className="text-gray-600">Subtotal</div>
          <div className="text-2xl font-semibold">${total.toFixed(0)}</div>
          <div className="mt-3 flex flex-col md:flex-row md:space-x-2 items-stretch md:items-center">
            <button
              onClick={() => navigate("/shopee")}
              className="w-full md:w-auto px-4 py-2 border rounded hover:bg-gray-100 mb-2 md:mb-0"
            >
              Seguir comprando
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full md:w-auto px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
              Ir a pagar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};