import React, { useState } from 'react';
import {MenuItems} from "./MenuItems"
import "./Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faTimes,faShoppingCart  } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [isSeller, setIsSeller] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  
  const handleLogin = (role) => {
    if (role === 'seller') {
      setIsSeller(true);
      setIsCustomer(false);
    } else if (role === 'customer') {
      setIsCustomer(true);
      setIsSeller(false);
    }
  }
  
  const [clicked, setClicked] = useState(false);
  
  const handleClick = () => {
    setClicked(!clicked);
  }

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
          {MenuItems.map((item,index)=>{
            return(
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            )
          })}
          <button className="cart-button">
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
          </button>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar;
