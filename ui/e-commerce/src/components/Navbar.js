import React, { Component } from "react";
import {MenuItems} from "./MenuItems"
import "./Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faTimes,faShoppingCart  } from '@fortawesome/free-solid-svg-icons';
import { Button } from "./Button";
class Navbar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        clicked: false
      };
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      this.setState({ clicked: !this.state.clicked });
    }
    render(){
        return(
            <div className="navbar-container">
            <nav className="NavbarItems">
                <div>
        <h1 className="navbar-logo">EE</h1>
        <div className="menu-icon" onClick={this.handleClick}>
          <FontAwesomeIcon icon={this.state.clicked ? faTimes : faBars} className="menu-icon" />
        </div>
      </div>
                <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
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
                <Button>LOGIN</Button>
            </nav>
            </div>
        )
    }
}
export default Navbar;