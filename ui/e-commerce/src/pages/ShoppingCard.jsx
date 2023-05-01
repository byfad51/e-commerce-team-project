import { useState, useEffect } from 'react';
import './ShoppingCard.css';
import Navbar from "../components/Navbar";
import {Container} from "semantic-ui-react";
function ShoppingCard() {
  const [cartItems, setCartItems] = useState([]);
  const [cartPrice, setCartPrice] = useState();
  const [cargoPrice, setCargoPrice] = useState([]);
  const [cartTotal, setCartTotal] = useState([]);



  useEffect(() => {
    // Fetch cart items from API with headers
    fetch('http://localhost:8080/cart/getCart', {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': localStorage.getItem("tokenKey")
      }
    })
      .then(response => response.json())
      .then(data => {
        setCartItems(data.cartItems);
        setCartPrice(data.totalCartPrice);
        setCargoPrice(data.totalCargoPrice);
        setCartTotal(data.totalPrice);
      });
  }, []);

  const handleDelete = (itemId) => {
    // Send DELETE request to API to remove item from cart
    fetch(`http://localhost:8080/cart/remove?cartItemId=${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': localStorage.getItem("tokenKey")
        },
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        // Refresh cart items from API
        fetch('http://localhost:8080/cart/getCart', {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': localStorage.getItem("tokenKey")
          }
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Network response was not ok');
            }
          })
          .then(data => {
            setCartItems(data.cartItems);
            setCartPrice(data.totalCartPrice);
            setCargoPrice(data.totalCargoPrice);
            setCartTotal(data.totalPrice);
          
          })
          
      })
     
  };

  const handleIncrease = (itemId) => {
    // Send DELETE request to API to remove item from cart
    fetch(`http://localhost:8080/cart/increment?cartItemId=${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': localStorage.getItem("tokenKey")
        },
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        // Refresh cart items from API
        fetch('http://localhost:8080/cart/getCart', {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': localStorage.getItem("tokenKey")
          }
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Network response was not ok');
            }
          })
          .then(data => {
            setCartItems(data.cartItems);
            setCartPrice(data.totalCartPrice);
            setCargoPrice(data.totalCargoPrice);
            setCartTotal(data.totalPrice);
          })
          
      })
    
  };

  const handleDecrease = (itemId) => {
    // Send DELETE request to API to remove item from cart
    fetch(`http://localhost:8080/cart/decrement?cartItemId=${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': localStorage.getItem("tokenKey")
        },
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        // Refresh cart items from API
        fetch('http://localhost:8080/cart/getCart', {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': localStorage.getItem("tokenKey")
          }
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Network response was not ok');
            }
          })
          .then(data => {
            setCartItems(data.cartItems);
            setCartPrice(data.totalCartPrice);
            setCargoPrice(data.totalCargoPrice);
            setCartTotal(data.totalPrice);
          
          })
        
      })
  };

  function handleEmpty() {
    fetch('http://localhost:8080/cart/emptyCart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': localStorage.getItem("tokenKey")
      }
    })
    .then(response => {
      window.location.reload();
    })
    
    .catch(error => {
      // handle error
    });
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.amount, 0);

  const formatPrice = (price) => {
    // Format price as currency with 2 decimal places
    return `$${price.toFixed(2)}`;
  };

  return (
<Container>
  <div><Navbar/></div>
    <div className="shopping-cart">
      <h1 className="title">Shopping Cart</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th className="cart-table__header">Product</th>
            <th className="cart-table__header">Price</th>
            <th className="cart-table__header">Quantity</th>
            <th className="cart-table__header">Total</th>
            <th className="cart-table__header"></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id} className="cart-item">
              <td className="cart-item__detail">
                <img className="cart-item__image" src={item.imageUrl} alt={item.productName} />
                <div className="cart-item__info">
                  <div className="cart-item__name">{item.productName}</div>
                  <div className="cart-item__id">{item.authorName}</div>
                </div>
              </td>
              <td className="cart-item__price">{formatPrice(item.price)}</td>
              <td className="cart-item__quantity">
                <button className="cart-item__button" onClick={() => handleDecrease(item.id)}>-</button>
                <span className="cart-item__quantity-value">{item.amount}</span>
                <button className="cart-item__button" onClick={() => handleIncrease(item.id)}>+</button>
              </td>
              <td className="cart-item__subtotal">{formatPrice(item.price * item.amount)}</td>
              <td className="cart-item__remove">
                <button className="cart-item__button cart-item__button--remove" onClick={() => handleDelete(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="clear-cart-button" onClick={() => handleEmpty()}>Clear the cart</button>
      <div className="total-price">Total: {formatPrice(totalPrice)} $</div>
    </div>
</Container>
  );
}

export default ShoppingCard;