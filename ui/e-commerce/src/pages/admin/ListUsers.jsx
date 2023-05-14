import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from 'react-bootstrap';
import './Dashboardtables.css'; // Import custom CSS file for styling

function ListUsers() {
  document.title = 'List Users';
  const [userData, setUserData] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/users/getAllUsers', {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': localStorage.getItem("tokenKey")
      }
    })
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      });
  }, []);

  const handleDelete = (itemId) => {
    setSelectedItemId(itemId);
    setShowConfirmationModal(true);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:8080/users/deleteUserById/${selectedItemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': localStorage.getItem("tokenKey")
      },
    })
      .then(response => {
        if (response.ok) {
          // Remove the deleted item from the state
          setUserData(prevItems =>
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
    <div>
      <h1>All Users</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User's First Name</th>
            <th>User's Last Name</th>
            <th>User-name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userData.map(item => (
            <tr key={item.id}>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.username}</td>
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
          Are you sure you want to delete this user?
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

export default ListUsers;