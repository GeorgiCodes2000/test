import React from 'react'
import '../scss/navbar.scss'
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { Link, useNavigate } from 'react-router-dom';

export default cosNavbar = () => {
    let navigate = useNavigate()
    const signUserOut = () => {
        signOut(auth).then(() => {
          localStorage.clear();
          navigate('/login')
        });
      };

   

  return (
    <div className="navigation">
  <div className="logo">
    <Link className="no-underline" to="/">
      MimoudiX
    </Link>
  </div>
  <div className="navigation-search-container">
    <i className="fa fa-search"></i>
    <input className="search-field" type="text" placeholder="Search"/>
    <div className="search-container">
      <div className="search-container-box">
        <div className="search-results">

        </div>
      </div>
    </div>
  </div>
  <div className="navigation-icons">
    <Link to="/" target ="_blank" className="navigation-link">
      <i className="far fa-compass"></i>
    </Link>
    <Link to="/" className="navigation-link notifica">
      <i className="far fa-heart"></i>
    </Link>
    <Link to="/" className="navigation-link">
      <i className="far fa-user-circle"></i>
    </Link>
    <p onClick={signUserOut} id="signout" className="navigation-link">
      <i className="fas fa-sign-out-alt"></i>
    </p>
  </div>
</div>

  )
}
