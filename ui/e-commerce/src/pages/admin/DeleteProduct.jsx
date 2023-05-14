import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import { AiOutlineSearch } from 'react-icons/ai';
import './DeleteProduct.css'; // Import custom CSS file for styling

function DeleteProduct() {
  document.title = 'Delete Product';
  const [deleteProductsItems, setDeleteProductsItems] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
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
    setSelectedItemId(itemId);
    setShowConfirmationModal(true);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:8080/products/deleteProduct/${selectedItemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': localStorage.getItem("tokenKey")
      },
    })
      .then(response => {
        if (response.ok) {
          // Remove the deleted item from the state
          setDeleteProductsItems(prevItems =>
            prevItems.filter(item => item.id !== selectedItemId)
          );
          setShowConfirmationModal(false);
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  const closeModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className="container">
      <h1>Delete Product</h1>

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
            <th>Delete</th>
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

      <Modal show={showConfirmationModal} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this product?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              No
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Yes
            </Button>
          </Modal.Footer>
      </Modal>
      
    </div>
  );
}

export default DeleteProduct;