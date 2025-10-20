import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById } from '../../api/product.js';
import { useCart } from "../../context/CartContex.jsx";
import { useNavigate } from 'react-router-dom';
const aromas = [
  { name: 'Lavanda', color: 'bg-purple-200', selectedColor: 'ring-purple-400' },
  { name: 'Rosas', color: 'bg-pink-200', selectedColor: 'ring-pink-400' },
  { name: 'Cítricos', color: 'bg-yellow-200', selectedColor: 'ring-yellow-400' },
  { name: 'Menta', color: 'bg-green-200', selectedColor: 'ring-green-400' },
  { name: 'Vainilla', color: 'bg-yellow-100', selectedColor: 'ring-yellow-300' },
];

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [adding, setAdding] = useState(false);
  const { addToCart } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id)
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  const handleAddToCart = () => {
    if (adding) return;
    setAdding(true);
    // pasar una copia limpia con quantity = 1
    const item = { ...product, quantity: 1 };
    addToCart(item);
    // notificar para componentes que no consumen el contexto directamente (opcional)
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: JSON.parse(localStorage.getItem("cart")) || [] }));
    // evitar dobles clicks breves
    setTimeout(() => setAdding(false), 300);
  };

  return (
    <div className="bg-white">
      <div className="py-6 ">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10 lg:gap-x-8">
        {/* Image gallery */}
        <div className="mx-auto mt-2  md:max-w-xl sm:px-2 lg:grid lg:max-w-4xl lg:grid-cols-1 lg:gap-8 lg:px-20">
          <img
            alt={product.name}
            src={product.imageUrl}
            className="row-span-1 mx-2 aspect-5/5 size-90 md:size-130 object-cover sm:rounded-lg lg:aspect-4/4"
          />
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Información del producto</h2>

            <p className="text-3xl tracking-tight font-bold text-gray-900">$ {product.price}</p>

            <div className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
              </div>

              {/* aromas */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Aromas</h3>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={adding}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-400 px-8 py-3 text-base font-medium text-white hover:bg-emerald-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
              >
                {adding ? "Agregando..." : "Agregar a la bolsa"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/shopee")}
                className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
              >
                Volver a la tienda
              </button>
            </div>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}