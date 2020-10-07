import React from 'react';
import { useHistory } from 'react-router-dom'
import { FaComment } from 'react-icons/fa'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { BiUpvote } from 'react-icons/bi'

const ProductDetails = ({product}) => {
    const history = useHistory()
    
    //Id function
    function productId(id){
        history.push(id)
    }
    
    return ( 
        <>
            <div className="content-wrapper">
                <div className="image-product">
                    <img src={product.imageURL} alt='img-product' 
                    style={{width: '225px', height: '200px'}} className="image-prod"/>
                </div>
                <div className="product-content">
                    <div className="product-header">
                        <h1 className="product-text" onClick={()=> productId(product.id)}>{product.name}</h1>
                            <p className="product-date">{formatDistanceToNow(new Date(product.created))}</p>
                            </div>
                            <p className="product-description" style={{marginTop: "0px"}}>
                                {product.paragraph}</p>
                            <p className="product-creator">Creador: {product.creatorName}</p>
                            
                            <div className="icons-and-details">
                        <p style={{marginRight: "3px"}}> {product.comments.length} comments <FaComment style={{color: "#FF4500"}}/></p> 
                          <p style={{marginRight: "50px"}}>{product.votes}<BiUpvote style={{color: "#FF4500"}}/></p> 
                </div>
                </div>
                
            </div>
            <hr className="hr-line"/>
        </>
        
     );
}
 
export default ProductDetails;