import React, {useEffect, useContext, useState} from 'react';
import { FirebaseContext } from '../firebase';


const useOrder = (order) => {
   
        const { firebase } = useContext(FirebaseContext)
        const [ products, setProducts] = useState([])
    
            useEffect(() => {
            const getProducts = () => {
                firebase.db.collection('products').orderBy(order, 'desc').onSnapshot(makeSnapshot)
            }
            getProducts()
            }, [])
    
        function makeSnapshot(snapshot){
            const products = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                    
                }
                
            });
            setProducts(products)
            console.log(products)
        }
     return { products }
}
 
export default useOrder;