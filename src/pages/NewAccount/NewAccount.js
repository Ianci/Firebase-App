import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './newaccount.css'
import { Formik, Form, ErrorMessage, Field} from 'formik'
import firebase from '../../firebase'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup';

const NewAccount = () => {
    const history = useHistory()
    const [ error , setError ] = useState(false)
    const [ submitSuccess, setSubmitSuccess ] = useState(false)
    //Fn
    async function crearCuenta(values){
        try {
            await firebase.registrar(values.nombre, values.email, values.password)
            setSubmitSuccess(true)  
            setTimeout(() => {
            history.push('/')
            }, 2000);
        } catch (error) {
             setSubmitSuccess(false)
            console.error('Hubo un error al crear el usuario', error.message)
            setError(error.message)
        }
    }
    
    return ( 
        <>
        <Formik initialValues={{nombre: '', email: '', password: '', password2: ''}} 
        validationSchema={Yup.object({
            nombre: Yup.string()
              .max(12, 'Tu nombre debe tener menos de 12 caracteres')
              .required('Por favor introduce tu nombre'),
            email: Yup.string()
              .email('El email no es válido')
              .required('Por favor introduce tu email'),
            password: Yup.string()
            .required('Por favor introduce tu contraseña')
            .min(8, 'La contraseña debe ser mayor a 8 caracteres')
            .max(15,'La contraseña debe ser menor a 15 caracteres'),
            password2: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
          })}
        onSubmit={(values, {setSubmitting})=>{
            setSubmitting(true)
            console.log(values)
            //async call
            crearCuenta(values)
            setSubmitting(false);
        }}>
            {( {isSubmitting, isValid, dirty})=> (
                
                <div className={submitSuccess ? "form-container-success" : "form-container"}>
                    
                
                    { submitSuccess ? null : <img src="/img/webshopping.svg" className="form-img" alt="form-img" />}
                
                <div className="form-content-right">
                    
                    {submitSuccess ? 
                    <>
                    
                    <div className="form-img-div-success">
                    <h1 className="form-h1">Gracias por registrarse, te estamos redireccionando a la página de inicio...</h1> 
                    <img src="/img/img2.svg" className="form-img-success" alt="form-img" />
                    </div>
                    </>
                    :    
                    <>
                    <Form className="form-new-account">
                    <h1 className="form-h1">Registrate ahora para obtener los mejores productos!</h1>
                    
                    <div className="form-inputs">
                            <label className="form-label-newacc">Nombre</label>
                            <Field className="form-input-newacc" type="text" name="nombre"
                            placeholder="Nombre"/>
                            <ErrorMessage name="nombre" component="small" />
                        </div>
                        <div className="form-inputs">
                            <label className="form-label-newacc">Email</label>
                            <Field className="form-input-newacc" type="email" name="email"
                            placeholder="Email"/>
                            <ErrorMessage name="email" component="small"/>
                        </div>
                        <div className="form-inputs">
                            <label className="form-label-newacc">Contraseña</label>
                            <Field className="form-input-newacc" type="password" name="password"
                            placeholder="Contraseña" />
                            <ErrorMessage name="password" component="small"/>
                        </div>
                        <div className="form-inputs">
                            <label className="form-label-newacc">Repita su contraseña</label>
                            <Field className="form-input-newacc" type="password" name="password2"
                            placeholder="Repita la contraseña"/>
                            <ErrorMessage name="password2" component="small"/>
                        </div>
                        <div className="btn-div">
                        <button disabled={!(isValid && dirty)} className={!(isValid && dirty) ? "form-btn-submit-disabled" : "form-btn-submit"} type="submit" 
                        >{!(isValid && dirty) ? 'Please fill the form': 'Submit'}</button>
                        </div>
                        <div style={{display: "flex", justifyContent:"center"}}>
                        <span className="form-span">
                        Ya tienes una cuenta? Ingresa <Link to="/login" style={{fontWeight: "bold", textDecoration: "none", color: "whitesmoke", marginLeft: "2px"}}>acá</Link>
                        </span>
                        </div>
                       
                    </Form>
                    { error && <h4 style={{color: "#fff", textAlign: "center"}}>{error}</h4>}
                    </>}

                        
                </div>
            </div>
        )}
                
        </Formik>
        </>
     );
}
 
export default NewAccount;