import React, { useState, useContext } from 'react';
import { Formik, Form, ErrorMessage, Field} from 'formik'
import { IoMdCloudUpload } from 'react-icons/io'
import firebase, { FirebaseContext } from '../../firebase'
import { useHistory } from 'react-router-dom'
import Error404 from '../Home/Error/Error404'
import FileUploader from 'react-firebase-file-uploader'
import * as Yup from 'yup';
import './NewProduct.css'

const NewProducts = () => {
    const { user, firebase } = useContext(FirebaseContext)
    const history = useHistory()
    const [ error , setError ] = useState(false)
    const [ submitSuccess, setSubmitSuccess ] = useState(false)
    //FileUploader states
    const [ imageName, setImageName] = useState('')
    const [ progress, setProgress ] = useState(0)
    const [ isUploading, setIsUploading ] =useState(false)
    const [ imageUrl, setImageUrl ] = useState('')

    //Crear producto FN
    async function crearProducto(values){
        if(!user){
            return history.push('/login')
        } 
        const product = {
            name: values.name,
            url: values.url,
            imageURL: imageUrl,
            description: values.description,
            paragraph: values.paragraph,
            votes: 0,
            comments: [],
            created: Date.now(),
            creatorName: user.displayName,
            creatorId: user.uid,
            voted: []
        }

            if(product.imageURL !== undefined ) {
                firebase.db.collection('products').add(product)
                setTimeout(() => {
                history.push('/')
            }, 3000); 
        }
        
    }

    //FileUploader Functions
    const handleUploadStart = () =>{
        setIsUploading(true)
        setProgress(0)
    };
    const handleProgress = progress => setProgress({progress});

    const handleUploadSuccess = name => {
        setImageName(name);
        setIsUploading(false);
        setProgress(100)
        firebase
            .storage
            .ref('products')
            .child(name)
            .getDownloadURL()
            .then(url => {
                setImageUrl(url)
                console.log(url)
        });

    }
    const handleUploadError = error => {
        setIsUploading(false)
        console.log(error)
    };

    if(!user) return <Error404 title="No tienes autorización para ver esta página"/>
   
    return ( 
        <>
        <Formik initialValues={{name: "", url: "", paragraph: "", description: "", image: undefined}}
        validationSchema={Yup.object({
            name: Yup.string()
            .max(50, '50 caracteres máximo')
            .required('Por favor introduce tu nombre'),
            paragraph: Yup.string()
            .max(80, 'Haz excedido el máximo de caracteres')
            .required('Describe brevemente tu producto'),
            description: Yup.string()
            .min(500, 'Por favor, haz una descripción más detallada del curso')
            .max(9000, '9000 caracteres máximo')
            .required('La descripción del producto es obligatoria'),
            url: Yup.string()
            .url('Por favor introduce una URL válida')
            .required('Este campo es obligatorio'),
            
        })}
        onSubmit={(values, {setSubmitting})=>{
            setSubmitting(true)
            setSubmitSuccess(true)
            console.log(values)
            crearProducto(values)
            setSubmitting(false)
            
        }}>
            {( {isSubmitting, dirty, isValid}) =>(
                <>
                 <div className={submitSuccess ? "form-container-success" : "form-container"}>
                    
                
                    { submitSuccess ? null : <img src="/img/webshopping.svg" className="form-img" alt="form-img" />}
                
                <div className="form-content-right-newproduct">
                    
                    {submitSuccess ? 
                    <>
                    
                    <div className="form-img-div-success">
                    <h1 className="form-h1">Producto subido ! ... redirigiendo a Inicio</h1> 
                    <img src="/img/img2.svg" className="form-img-success" alt="form-img" />
                    </div>
                    </>
                    :    
                    <>
                    <Form className="form-login">
                    <h1 className="form-h1">Nuevo Producto</h1>
                    
                    <fieldset className="fieldset-newproduct">
                            <legend className="legend">Información del producto</legend>
                    <div className="form-inputs-newproduct">
                            <label className="form-label-newacc">Nombre</label>
                            <Field className="form-input-newacc" type="text" name="name"
                            placeholder="Nombre"/>
                            <ErrorMessage name="name" component="small" />
                        </div>
                        <div className="form-inputs-newproduct">
                            <label className="form-label-newacc">Presenta brevemente tu proyecto</label>
                            <Field className="form-input-newacc" type="text" name="paragraph"
                            placeholder="Describe tu proyecto"/>
                            <ErrorMessage name="paragraph" component="small"/>
                        </div>
                        <div className="form-inputs-newproduct">
                          
                            <label className="form-label-newacc">Url</label>
                            <Field className="form-input-newacc" type="url" name="url"
                            placeholder="Url" />
                            <ErrorMessage name="url" component="small"/>
                        </div>
                        <div className="form-inputs-newproduct">
                            <label className="form-label-newacc" style={{fontSize: "1rem"}}>
                            <IoMdCloudUpload style={{color: "#fff", fontSize: "1.2rem", marginTop: "4px"}}/>
                            Imagen del producto</label>
                            

                            <FileUploader 
                            accept="image/*"
                            randomizeFilename
                            storageRef={firebase.storage.ref("products")}
                            onUploadStart={handleUploadStart}
                            onUploadError={handleUploadError}
                            onUploadSuccess={handleUploadSuccess}
                            onProgress={handleProgress}
                            className="fileUploader" 
                            
                            />
                            <ErrorMessage name="image" component="small"/>
                            </div>
                        </fieldset>
                        <fieldset className="fieldset-newproduct">
                            <legend className="legend">Info del producto</legend>
                            <Field name="description" placeholder="Describe detalladamente tu proyecto"component="textarea" wrap="hard" className="form-input-textarea"/>
                            <ErrorMessage name="description" component="small" />
                        </fieldset>
                        <div className="btn-div">
                        <button disabled={!(isValid && dirty)} className={!(isValid && dirty) ? "form-btn-submit-disabled" : "form-btn-submit"} type="submit" 
                        >{!(isValid && dirty) ? 'Please fill the form': 'Submit'}</button>
                        </div>
                        
                    </Form>
                    { error && <h4 style={{color: "#fff", textAlign: "center"}}>{error}</h4>}
                    </>}

                        
                </div>
            </div>
                </>
            )}
        
        </Formik>
        </>
     );
}
 
export default NewProducts;