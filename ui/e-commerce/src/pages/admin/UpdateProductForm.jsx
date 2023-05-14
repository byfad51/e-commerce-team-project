import React, { useState } from 'react';
import './UpdateProductForm.css';
import {Image} from 'semantic-ui-react'

function UpdateProductForm({ product, onUpdate, onClose }) {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(updatedProduct);
  };

  return (
    <div className="update-product-form-container">
      <form className="update-product-form" onSubmit={handleSubmit}>
        <h2>Update Product</h2>

        <div className="form-group">
        <center>{updatedProduct.imageUrl ?  <Image width={"200"}height={"300"}src={updatedProduct.imageUrl} />: <Image width={"200"}height={"300"}  src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}/>}</center>
        <input
            type="text"
            name="imageUrl"
            value={updatedProduct.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Book Name:</label>
          <input
            type="text"
            name="productName"
            value={updatedProduct.productName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Author Name:</label>
          <input
            type="text"
            name="authorName"
            value={updatedProduct.authorName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Number of Pages:</label>
          <input
            type="number"
            name="numberOfPages"
            value={updatedProduct.numberOfPages}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Language:</label>
          <input
            type="text"
            name="language"
            value={updatedProduct.language}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>ISBN:</label>
          <input
            type="number"
            name="ISBN"
            value={updatedProduct.ISBN}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Publisher:</label>
          <input
            type="text"
            name="publisher"
            value={updatedProduct.publisher}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={updatedProduct.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Publish Date:</label>
          <input
            type="number"
            name="publishDate"
            value={updatedProduct.numberOfPages}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={updatedProduct.stock}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={updatedProduct.description}
            onChange={handleChange}
          />
        </div>

        <div className="button-group">
          <button className="update-button" type="submit">
            Update
          </button>
          <button className="cancel-button" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProductForm;