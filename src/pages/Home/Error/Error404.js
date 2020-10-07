import React from 'react'
import { Link } from 'react-router-dom'
import './error.css'
const Error404 = (props) => {
    return ( 
        <div className="error-container">
            <div className="error-wrapper">
            <h1 className="error-title">{props.title}</h1>
            </div>
            <img src="img/error.svg" alt="" className="error-img" />
            <Link to="/" style={{display: "flex", justifyContent: "center", textDecoration: "none"}}><button type="button" className="error-btn">Return</button></Link>
        </div>
     );
}
 
export default Error404;