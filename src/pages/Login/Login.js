import React, { useState } from 'react';
import { Formik, Form, ErrorMessage, Field} from 'formik'
import { useHistory } from 'react-router-dom'
import firebase from '../../firebase'
import * as Yup from'yup'
import './login.css'


const Login = () => {
    const [ submitSuccess, setSubmitSuccess ] = useState(false)
    const [ error, setError ] = useState(false)
    const history = useHistory()
    async function iniciarSesion(values){
        try {
          await firebase.login(values.email, values.password)  
          setSubmitSuccess(true)
          setTimeout(() => {
              history.push('/')
          }, 3000);
        } catch (error) {
            console.error('Hubo un error al autenticar el usuario', error.message)
            setSubmitSuccess(false)
            setError(error.message)
        }
    }
    return ( 
        <>
        <Formik initialValues={{email: '', password: ''}}
        validationSchema={Yup.object({
            email: Yup.string()
                .email('El email no es válido')
                .required('Por favor introduce tu email'),
            password: Yup.string()
                .required('Por favor introduce tu contraseña')
        })}
        onSubmit={(values, { setSubmitting})=>{
            setSubmitting(true)
            console.log(values)
            iniciarSesion(values)
            setSubmitting(false)
        }}>
            {( {isSubmitting, dirty, isValid}) =>(
                <>
        <div className={submitSuccess ? "form-container-success" : "form-container"}>
                    { submitSuccess ? null : <img src="/img/webshopping.svg" className="form-img" alt="form-img" />}
                <div className="form-content-right">
                    {submitSuccess ? 
                    <><h1 className="form-h1">Iniciando Sesión...</h1>
                    <img src="/img/img2.svg" className="form-img-success" alt="form-img" />
                    </>
                    : 
                    <>
                    <h1 className="form-h1">Inicia sesion ahora</h1>
                    <Form className="form-login">
                        <div className="form-inputs">
                        <label className="form-label-newacc">Email</label>
                        <Field type="email" name="email" className="form-input-newacc" placeholder="Por favor introduce tu email" />
                        <ErrorMessage name="email" component="small"/>
                        </div>
                        <div className="form-inputs">
                        <label className="form-label-newacc">Contraseña</label>
                        <Field type="password" name="password" className="form-input-newacc" placeholder="Por favor introduce tu contraseña" />
                        <ErrorMessage name="password" component="small"/>
                        </div>
                        <div className="btn-div">
                        <button disabled={!(isValid && dirty)} className={!(isValid && dirty) ? "form-btn-submit-disabled" : "form-btn-submit"} type="submit" 
                        >{!(isValid && dirty) ? 'Please fill the form': 'Submit'}</button>
                        </div>
                        { error && <h4 style={{color: "#fff", textAlign: "center"}}>{error}</h4>}
                    </Form>
                    </>
                    }
                </div>
            </div>
            </>
            )}
        </Formik>
        </>
        
     );
}
 
export default Login;