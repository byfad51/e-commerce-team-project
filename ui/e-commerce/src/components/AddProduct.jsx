import React, {useState} from "react";
//import {FormControl, InputLabel, Input, Button, FormHelperText} from "@mui/material"
import { useNavigate } from "react-router-dom";
import { Form, Button} from 'react-bootstrap';
import {   Grid, Segment } from 'semantic-ui-react'


function AddProduct () {
    document.title = 'Register';
    const navigate = useNavigate();

    const [productName, setProductName] = useState("")
    const [description, setDescription] = useState("")
    const [authorName, setAuthorName] = useState("")
    const [price, setPrice] = useState("")
    const [numberOfPages, setNumberofpages] = useState("")
    const [publisher, setPublisher] = useState("");
    const [language, setLanguage] = useState("");
    const [stock, setStock] = useState("");
    const [isbn, setISBN] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [publishedDate, setPublishedDate] = useState("");
    

    const handleProductName = (value) => {setProductName(value) }
    const handleDescription = (value) => {setDescription(value)}
    const handlenumberOfPages = (value) => {setNumberofpages(value) }
    const handleAuthorName = (value) => {setAuthorName(value)}
    const handlePrice = (value) => {setPrice(value) }
    const handlePublisher = (value) => {setPublisher(value) }
    const handleLanguage = (value) => {setLanguage(value)} 
    const handleStock = (value) => {setStock(value)}
    const handleISBN = (value) => {setISBN(value)}
    const handleImageUrl = (value) => {setImageUrl(value)}
    const handlePublishedDate = (value) => {setPublishedDate(value)}


    const sendRequest = (path) => {
        const requestBody = {
            productName: productName,
            description: description,
            authorName: authorName,
            price: price,
            numberOfPages: numberOfPages,
            publisher: publisher,
            language: language,
            stock: stock,
            isbn: isbn,
            imageUrl: imageUrl,
            publishedDate: publishedDate
          };
          console.log(requestBody);

        fetch("http://localhost:8080/" + path, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            productName: productName,
            description: description,
            authorName: authorName,
            price: price,
            numberOfPages: numberOfPages,
            publisher: publisher,
            language: language,
            stock: stock,
            isbn: isbn,
            imageUrl: imageUrl,
            publishedDate: publishedDate
          }),
        })
        
       .then((res) => {
            if (!res.ok) {
             throw new Error("Error " + res.status + ": " + res.statusText);
          }
          console.log(res);
             return res.text();
          })
         .then((data) => {
              alert("Product has been added!")
           })
         .catch((err) =>{
             console.log(err)
            alert("Ops, something went wrong!")
        } );

      };      

    const handleAddProduct = () => {
        sendRequest("products/addProduct")
    }
    return(
        <Segment>
            <Grid columns={3} relaxed='very' stackable>
                <Grid.Column> </Grid.Column>
                <Grid.Column>
      <Form>
      <Form.Group className="mb-3">
        <Form.Label>Book Name</Form.Label>
        <Form.Control type="text" placeholder="Book Name" onChange={(event) => handleProductName(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Author Name</Form.Label>
        <Form.Control type="text" placeholder="Author Name" onChange={(event) => handleAuthorName(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter your username" onChange={(event) => handleDescription(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number"  onChange={(event) => handlePrice(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Number of Pages</Form.Label>
        <Form.Control type="number" placeholder="Ex: 450" onChange={(event) => handlenumberOfPages(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Publisher</Form.Label>
        <Form.Control type="text" placeholder="Ex: Orhan Pamuk" onChange={(event) => handlePublisher(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Stock</Form.Label>
        <Form.Control type="number" placeholder="Ex: 20" onChange={(event) => handleStock(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
      <Form.Label>Language</Form.Label>
      <Form.Select onChange={(event) => handleLanguage(event.target.value)}>
        <option value="">Choose a question...</option>
        <option value="Turkish">Turkish</option>
        <option value="English">English</option>
      </Form.Select>
      </Form.Group>
     
      <Form.Group className="mb-3">
        <Form.Label>Publish Date</Form.Label>
        <Form.Control type="text" placeholder="Answer" onChange={(event) => handlePublishedDate(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Image Url</Form.Label>
        <Form.Control type="text" placeholder="Url" onChange={(event) => handleImageUrl(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>ISBN</Form.Label>
        <Form.Control type="text" placeholder="Url" onChange={(event) => handleISBN(event.target.value)} />
      </Form.Group>
      <Button variant="dark" onClick={handleAddProduct}>Add</Button>
      <Form.Text className="text-muted mb-3">

          <br/>
      </Form.Text>
    </Form>
            </Grid.Column>
                <Grid.Column>   </Grid.Column>
            </Grid>


        </Segment>
    )
}

export default AddProduct;