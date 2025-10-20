import { useEffect, useState } from "react";
import { getProducts } from "../../api/product.js";
import { Link } from "react-router-dom";
import {useCart} from "../../context/CartContex.jsx";

const categories = [
  { name: 'Velas', href: '#', count: 0 },
  { name: 'Ambientadores', href: '#', count: 0 },
  { name: 'Difusores', href: '#', count: 0 },
  { name: 'Detalles', href: '#', count: 0 },
]

export const Shopee = ()=> {

    const [products, setProducts] = useState([]);
    const {addToCart} = useCart();        
    
    useEffect(() => {
          getProducts().then(setProducts).catch(console.error);
    }, []);

  return (
    // <div className="bg-white">
    //   <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    //     <h2 className="sr-only">Products</h2>

    //     <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
    //       {products.map((product) => (
    //         <a key={product.id} className="group">
    //           <img
    //             alt={product.name}
    //             src={product.imageUrl}
    //             className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
    //           />
    //           <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
    //           <p className="mt-1 text-lg font-medium text-gray-900">$ {product.price}</p>

    //         </a>
    //       ))}
    //     </div>
    //   </div>
    // </div>

    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <img
                alt={product.name}
                src={product.imageUrl}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
              />
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">$ {product.price}</p>
              <Link 
                to={`/detailProduct/${product.id}`} 
                className="absolute bottom-35 left-74 md:bottom-35 md:left-56 bg-[#C5D1C5] rounded-full p-2 shadow hover:bg-gray-100 transition"
                title="Ver detalles"
              >
                {/* Icono lupa SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </Link>
              <div>
                <button type="button"
                  className="rounded bg-emerald-300 hover:bg-emerald-200 px-2 py-2"
                 onClick={() => addToCart(product)}
                >
                  Añadir a la bolsa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  
  )
}