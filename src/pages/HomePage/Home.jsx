import { useEffect, useState } from "react";
import { getRecommendedProducts } from "../../api/product.js";

import { Hero } from "./components/Hero.jsx";
import { About } from "./components/About.jsx";
import { Benefits } from "./components/Benefits.jsx";
import { Recommended } from "./components/Recommended.jsx";

export const Home = () =>{
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        getRecommendedProducts().then(setProducts).catch(console.error);
    }, []);
    
    return(
        <>
            <Hero/>
            <Benefits/>
            <About/>
            <Recommended products={products}/>
        </>
    )
}