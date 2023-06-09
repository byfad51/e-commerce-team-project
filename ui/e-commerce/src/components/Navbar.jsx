import React, { useState, useEffect  } from 'react';
import "../design/Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faTimes,faShoppingCart,faUser  } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import Popup from "./pop_message";
import {faHeart} from "@fortawesome/free-solid-svg-icons/faHeart";
import ProductSearch from "../pages/product/ProductSearch";

function Navbar() {
  const [showPopup, setShowPopup] = useState(false);

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
  useEffect(() => {
    checkAuth();
    console.log("calisti auth");
  }, []);

  const checkAuth = async () => {
    const url = 'http://localhost:8080/users/check';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          'Authorization': localStorage.getItem("tokenKey")
        },
      });
        console.log(response.status)
      if (!response.ok) {
        console.log(response.status)
        if(response.status === 401 && localStorage.getItem("authorized") ==="true"){
          localStorage.clear()
          localStorage.setItem("authorized", "false")
          console.log("you go to logout")
          setShowPopup(true)
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(response.json())
    } catch (error) {
      console.log("401 - unauthorized")
      //  console.error(`Error: ${error.message}`);
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


          <div>{showPopup && (
              <Popup
                  buttonText1={"Go to Login"}
                  buttonColor1={"green"}
                  buttonText2={"Go without Login"}
                  buttonColor2={"yellow"}
                  errorMessageTitle={"Expired Session"}
                  errorMessage={"Your session has expired, you need to login again."}
                  icon={'warning circle'}
                  onClose1={()=> {
                navigate("/login")
                setShowPopup(false)
              }}
                  onClose2={()=> {
                    setShowPopup(false)
                  }}
              />
          )}


            <div style={{ display: 'flex' }}>
              <div className="navbar-logo" style={{marginRight:'30px'}}>
                <h1>
                  <a href={"/"}>
                    <font color={"black"}>E</font>
                    <font color={"black"}>E</font>
                  </a>
                </h1>
              </div>
              <ul >
                <ProductSearch/>
              </ul>
            </div>

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

            {localStorage.getItem("role")==="USER" ? <li key={2}>
              <a className={"nav-links"} href={"./user"}>
                {<FontAwesomeIcon icon={faUser} className="cart-icon" />}
              </a>
            </li>: null}
          </ul>

        </nav>
      </div>
  )
}

export default Navbar;
