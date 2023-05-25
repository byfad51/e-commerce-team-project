// DeleteProduct.js

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import { AiOutlineSearch } from 'react-icons/ai';
import './Dashboardtables.css'; // Import custom CSS file for styling
import UpdateProductForm from './UpdateProductForm';

function UpdateProduct() {
  document.title = 'Update Product';
  const [deleteProductsItems, setDeleteProductsItems] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
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

  useEffect(() => {
    const filtered = deleteProductsItems.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [deleteProductsItems, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = (itemId) => {
    const selectedProduct = deleteProductsItems.find(item => item.id === itemId);
    setSelectedProduct(selectedProduct);
  };

  const handleUpdate = (updatedProduct) => {
    fetch(`http://localhost:8080/products/updateProduct/${updatedProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': localStorage.getItem("tokenKey")
      },
      body: JSON.stringify(updatedProduct)
    })
      .then(response => {
        if (response.ok) {
          setDeleteProductsItems(prevItems =>
            prevItems.map(item => (item.id === updatedProduct.id ? updatedProduct : item))
          );
          setSelectedProduct(null);
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container">
      <h1>Update Product</h1>

      <div className="search-container">
        <div className="search-icon">
          <AiOutlineSearch />
        </div>
        <input
          type="text"
          placeholder="Search by Book's Name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <Table className="product-table" striped bordered hover>
        <thead>
          <tr>
            <th>Book</th>
            <th>Name</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="product-image-container">
                  <img className="product-image" src={item.imageUrl} alt={item.productName} />
                </div>
              </td>
              <td>{item.productName}</td>
              <td>{item.authorName}</td>
              <td>{item.publisher}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                  X
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={selectedProduct !== null} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Re-enter the value that you want to update.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateProductForm
            product={selectedProduct}
            onUpdate={handleUpdate}
            onClose={closeModal}
          />
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default UpdateProduct;


