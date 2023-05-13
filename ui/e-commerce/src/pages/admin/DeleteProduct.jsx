import React, { useState,useEffect } from "react"
import { Table, Button } from 'react-bootstrap';

function DeleteProduct () {
    document.title = 'Delete Product';
    const [deleteProductsItems, setDeleteProductsItems] = useState([]);
    
  useEffect(() => {
    // Fetch cart items from API with headers
    fetch('http://localhost:8080/products/getAllProducts', {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': localStorage.getItem("tokenKey")
       
      }
    })
      .then(response => response.json())
      .then(data => {
        setDeleteProductsItems(data);
        
      });
  }, []);

  const handleDelete = (itemId) => {
    // Send DELETE request to API to remove item from cart
    fetch(`http://localhost:8080/products/deleteProduct/${itemId}`, {
        method: 'DELETE',
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
        fetch('http://localhost:8080/products/getAllProducts', {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            
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
            setDeleteProductsItems(data)
          })
          
      })
     
  };

  



  return (
    <div>
      <h1>Delete Product</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Author</th>
            <th>Publisher</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {deleteProductsItems.map(item => (
            <tr key={item.id}>
              <td>
                <img src={item.imageUrl} alt={item.productName} style={{ width: '50px' }} />
              </td>
              <td>{item.productName}</td>
              <td>{item.authorName}</td>
              <td>{item.publisherName}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DeleteProduct;