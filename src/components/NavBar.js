import React, { useState, useContext} from 'react';
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { RiFireFill } from 'react-icons/ri'
import { FirebaseContext } from '../firebase'
import Search from './search/Search'
import './NavBar.css'
const NavBar = () => {
    const { user , firebase } = useContext(FirebaseContext)
    const [ click, setClick ] = useState(false)
    

    //Responsive Icon
    const handleClick = () => {
        setClick(!click)
    }

   
    return ( 
        <nav className="navbar">
            <div className="navbar-container container">
                <Link to="/" className="navbar-logo">
                    <RiFireFill className="navbar-icon" /> 
                        <span>FireBase </span>
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                {click ? <FaTimes /> : <FaBars />}
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'} onClick={handleClick}>
                    <li className="nav-item">
                        <Link to="/" className="nav-links">
                            Inicio
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/populars" className="nav-links">
                            Populares
                        </Link>
                    </li>
                    { user && <li className="nav-item">
                        <Link to="/new-products" className="nav-links">
                            Nuevo Producto
                        </Link>
                    </li>}
                </ul>
                <Search />
                    <div className="user-interface">
                        {user ? 
                        (
                            <>
                            <span className="user-name">Hola <strong>{user.displayName}</strong></span>
                            <button className="button-user logout" type="button"
                            onClick={() => firebase.cerrarSesion()}
                            ><Link to="/"  style={{color: "#fff", textDecoration: "none", fontSize: "15px"}}>Cerrar sesion</Link></button>
                            </>
                        )
                        :
                        (
                            <>
                            <button className="button-user" type="button"><Link to="/login" style={{color: "#fff", textDecoration: "none", fontSize: "15px"}}>Iniciar sesion</Link></button>
                            <button className="button-user" type="button"><Link to="/new-account"  style={{color: "#fff", textDecoration: "none", fontSize: "15px"}}>Crear cuenta</Link></button>
                            </>
                        )
                        }
                        
                       
                       
                    </div>
            </div>
        </nav>

     );
}
 
export default NavBar;