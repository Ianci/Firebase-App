import React from 'react';

import ProductDetails from './Home/Product/ProductDetails'
import useOrder from '../hooks/useOrder'

const Populars = () => {
   const { products } = useOrder('votes')
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
 
export default Populars;