import React, {useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../../../firebase';
import { useHistory } from 'react-router-dom'
import Spinner from '../Spinner/Spinner';
import Error404 from '../Error/Error404';
import { Formik, Form, ErrorMessage, Field} from 'formik'
import * as Yup from 'yup';
import './ProductClicked.css'
import Swal from 'sweetalert2'; 
import { CgGirl } from 'react-icons/cg';

const Product = () => {
    const history = useHistory()
    const path = history.location.pathname.substring(1)
    //Context
    const { user, firebase } = useContext(FirebaseContext)
    //State
    const [ isLoading, setIsLoading ] = useState(true)
    const [ product, setProduct ] = useState({})
    const [ error, setError ] =useState(false)
    const [ showBtn, setShowBtn] = useState(false)


    const { comments, creatorId} = product
    
  
    //Obtener producto
    useEffect(() => {
        
        if(path){
            const getProduct = async () => {
                const producto = await firebase.db.collection('products').doc(path)
                const obtainProduct = await producto.get()
                setIsLoading(false)
                if(obtainProduct.exists){
                        setProduct(obtainProduct.data())
                        console.log(obtainProduct.data())

                } else {
                    setError(true)
                }
        }
        getProduct()  
        }
    }, [path])

   //Detecta si es el creador para displayear el button de eliminar
      
        const canDelete = () => {
            if(user.uid === creatorId){
                return true
            }
        }
      
       
   
  
   const handleDelete = () => {
    Swal.fire({
        title: 'Estás seguro/a?',
        text: "No podrás revertir esta acción!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
        deleteProduct()
        Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
      }

   const deleteProduct = async () => {
    if(!user){
        return history.push('/login')
    }
    if(user.uid !== creatorId){
        return history.push('/')
    }
    try {
        await firebase.db.collection('products').doc(path).delete()
        history.push('/')
        } catch (error) {
            console.log(error)
        }
   }
  
   
    //Creator distintivo
    const isCreator = id =>{
        if(creatorId === id) {
            return true;
        }
    }
    //Vote FN
    const voteFunction = () => {
        if(!user){
            history.push('/')
        }
        const voteCounter = product.votes + 1
        //Verificar si el usuario actual ha votado
        if(product.voted.includes(user.uid)) return;
        //Guardar id
        const alreadyVoted = user.uid
        //Actualizar en la bd
        firebase.db.collection('products').doc(path).update({ votes: voteCounter, voted: alreadyVoted})
        //Actualizar el state
        setProduct({
            ...product,
            votes: voteCounter,
            voted: alreadyVoted
        })
        
    }
    
    
    //Componente o error
    const component =  error ? (<Error404 title="La búsqueda no arrojó ningún resultado"/>) : 
    (
        <>
        <Formik initialValues={{comment: ''}}
        validationSchema={Yup.object({
            comment: Yup.string()
            .required('Escribe algún comentario sobre el curso!')
            .max(250, '250 caracteres máximos permitidos')
            .min(20, 'Mínimo 20 caracteres')
        })}
        onSubmit={(values, {resetForm})=>{
            if(!user){
                return history.push('/login')
            }
            
            //Info extra al comentario
            values.userId = user.uid;
            values.userName = user.displayName;
            //Copia de comments y agregar el nuevo
            const newComments = [...comments, values];
            console.log(values)
            resetForm({values: ''})
            //Actualizar bd
            firebase.db.collection('products').doc(path).update({ comments: newComments})

            //Actualizar state
            setProduct({
                ...product,
                comments: newComments
            })
        }}>
            {({isValid, dirty})=> (
                 <div className="container-prod-clicked">
                    <div className="content-wrapper-prod-clicked">
                        <h1 className="product-clicked-name">{product.name}</h1>
                        <p className="creator-name">Published by: <strong>{product.creatorName}</strong></p>
                        <img src={product.imageURL} alt="image2" className="img-prod-clicked"/> 
                        <p className="product-clicked-description">{product.description}</p>
                        {user &&
                        <>
                        <h2 className="comment-section">Comentarios</h2>
                        <Form className="form-prod-clicked">
                            <Field name="comment" component="textarea" type="text" className="input-prod-clicked" />
                            <ErrorMessage name="comment" component="small"/>
                            <div className="btn-center">
                                <button type="submit" className="error-btn">Enviar</button>
                            </div>
                        </Form>
                        <div className="comment-section">
                                {comments ? comments.map(comment=>(
                                    <>
                                     <div className="comment-wrapper">
                                        <CgGirl  className="comment-icon"/>
                                        <div className="body-comment">
                                            <p>{comment.comment}</p>
                                            <div className="comment-author-wrapper">
                                            <p className="comment-writter">Escrito por: <strong style={{color: '#000'}}>{comment.userName}</strong></p>
                                            {isCreator(comment.userId)&& 
                                            <>
                                            <p className="comment-creator">Creador del curso</p>
                                            </>
                                            }
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                ))
                                : 'Loading'}
                                
                            
                        </div>
                        </>}
                        
                      
                    </div>
                    { user &&
                    <>
                    <div className="sidebar-prod-clicked">
                        <button type="button" className="button-url"><a href={product.url} style={{textDecoration: "none", color: "#fff"}}
                        target="_blank"
                        rel="noopener noreferrer"
                        >Visit Url</a></button>
                         
                        <button type="button" className="button-votation"
                        onClick={voteFunction}
                        >Vote</button>
                       
                        <p className="votes">
                            <span className="votes-border">{product.votes}</span> {''}
                        votes</p>


                        {
                        canDelete() && <button type="button" className="delete-button"
                        onClick={handleDelete}>Eliminar</button>
                        }
                    </div>
                 
                    </>}
                    
                </div>
            )}
        </Formik>
    </>
    )

    return ( 
        <>
        { isLoading ? <Spinner /> : component}
        
        </>
     );
}
 
export default Product;
