import React, {useState, useEffect} from 'react';
import { useHistory} from 'react-router-dom'
import ProductDetails from '../../pages/Home/Product/ProductDetails'
import useOrder from '../../hooks/useOrder'

const SearchProject = () => {
    const history = useHistory()
    const params = history.location.search.substring(3).toLocaleLowerCase()
   
    const { products } = useOrder('votes')

    const [ prodFilter, setProdFilter ] = useState([])
    
    useEffect(() => {
        const filterProyects = products.filter(product => {
            return (
                product.name.toLocaleLowerCase().includes(params) || 
                product.paragraph.toLocaleLowerCase().includes(params)
            )
        });
        setProdFilter(filterProyects)
    }, [products, params])

    
    return ( 
        <div className="products-container">
        
        {prodFilter.map(product => (
            <ProductDetails 
            key={product.id}
            product={product}
            />
        ))}
   
</div>
     );
}
 
export default SearchProject;