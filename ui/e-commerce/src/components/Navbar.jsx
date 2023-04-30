import React, { useState, useEffect  } from 'react';
import "../design/Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faTimes,faShoppingCart  } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isSeller, setIsSeller] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const navigate = useNavigate();
  const handleLogin = (role) => {
    if (role === 'seller') {
      setIsSeller(true);
      setIsCustomer(false);
    } else if (role === 'customer') {
      setIsCustomer(true);
      setIsSeller(false);
    }
  }

  /* const handleLogout = () => {
     localStorage.setItem("authorized",false)
     localStorage.setItem("username","")
     navigate("/")

     useEffect(() => {
       const timeout = setTimeout(() => {
         navigate('/');
       }, 2000);

       return () => clearTimeout(timeout);
     }, [navigate]);
   }*/

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  }
  const username = localStorage.getItem("username");
  const authorized = localStorage.getItem("authorized");
  return (
      <div className="navbar-container">
        <nav className="NavbarItems">
          <div>
            <h1 className="navbar-logo">EE</h1>
            <div className="menu-icon" onClick={handleClick}>
              <FontAwesomeIcon icon={clicked ? faTimes : faBars} className="menu-icon" />
            </div>
          </div>
          <ul className={clicked ? "nav-menu active" : "nav-menu"}>

            <li key={0}>
              <a className={"nav-links"} href={"/"}>
                {"Home"}
              </a>
            </li>
            <li key={1}>
              <a className={"nav-links"} href={"/products"}>
                {"Products"}
              </a>
            </li>
            {localStorage.getItem("role")==="ADMIN" ? <li key={2}>
              <a className={"nav-links"} href={"./Dashboard"}>
                {"Dashboard"}
              </a>
            </li>: null}


            <li key={3}>
              {authorized!=="true" ? <a className={"nav-links"} href={"./login"}>
                {"Login"}
              </a> :  <a className={"nav-links"}  href={"./logout"}>
                {"Logout"}
              </a>}
            </li>
            
            <li key={4}>
              <a className={"nav-links-mobile"} href={"#"}>
                {"-"}
              </a>
            </li>


            <button className="cart-button" onClick={() => navigate('/cart')}>
              <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
            </button>
          </ul>
        </nav>
      </div>
  )
}

export default Navbar;
