import { useState, useEffect } from 'react';
import './ShoppingCard.css';

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
          .catch(error => console.error('Error fetching cart items:', error));
      })
      .catch(error => console.error('Error removing item from cart:', error));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    // Send PUT request to API to update item quantity in cart
    fetch(`http://localhost:8080/updateStockbyId?id=${itemId}&quantity=${newQuantity}`, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(data => {
        // Refresh cart items from API
        fetch('http://localhost:8080/cart/getCart')
          .then(response => response.json())
          .then(data => setCartItems(data));
      });
  };

  const formatPrice = (price) => {
    // Format price as currency with 2 decimal places
    return `$${price.toFixed(2)}`;
  };

  return (
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
                  <div className="cart-item__id">Item #{item.id}</div>
                </div>
              </td>
              <td className="cart-item__price">{formatPrice(item.price)}</td>
              <td className="cart-item__quantity">
                <button className="cart-item__button" onClick={() => handleQuantityChange(item.id, item.amount - 1)}>-</button>
                <span className="cart-item__quantity-value">{item.amount}</span>
                <button className="cart-item__button" onClick={() => handleQuantityChange(item.id, item.amount + 1)}>+</button>
              </td>
              <td className="cart-item__subtotal">{formatPrice(item.price * item.amount)}</td>
              <td className="cart-item__remove">
                <button className="cart-item__button cart-item__button--remove" onClick={() => handleDelete(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShoppingCard;