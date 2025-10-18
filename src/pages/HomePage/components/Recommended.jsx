import { ProductCard } from "../../../components/ProductCard";
import { useCart } from "../../../context/CartContex.jsx";

export const Recommended = ({products}) =>{

    const {addToCart} = useCart();
    
    return(
        <>
            <div className="border-x-orange-400 row py-10 mx-2">
                <div className="row justify-around text-center text-3xl mb-10 font-sans font-semibold" >
                    <p>Productos recomendados</p>
                </div>
                <div className=" bg-white-100 mx-auto grid sm:grid-cols-1 md:grid-cols-4 align-items-center justify-content-center gap-6">    
                    {products.map((product) => (
                        <ProductCard 
                        key={product.id}
                        product={product}
                        onAddToCart={() => addToCart(product)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}