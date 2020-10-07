import React from 'react';

import ProductDetails from './Product/ProductDetails'
import useOrder from './../../hooks/useOrder'
import './home.css'
const Home = () => {
   const { products } = useOrder('created')
    return ( 
        <>
        <div className="products-container">
        
                 {products.map(product => (
                     <ProductDetails 
                     key={product.id}
                     product={product}
                     />
                 ))}
            
        </div>
        </>
     );
}
 
export default Home;