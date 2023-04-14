import React, {useState} from "react";
//import {FormControl, InputLabel, Input, Button, FormHelperText} from "@mui/material"
import { useNavigate } from "react-router-dom";
import { Form, Button, Row,Col} from 'react-bootstrap';
import {Message} from 'semantic-ui-react'
import "../../design/design.css"

function AddProduct () {
    document.title = 'Add Product';
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

    const [message, setmessage] = useState("");
    const [messageColor, setMessageColor] = useState("green");

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
        console.log(localStorage.getItem("tokenKey"));
        fetch("http://localhost:8080/" + path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': localStorage.getItem("tokenKey")
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
                if (res.status===409) {
                    setmessage("Ops, there is book named same!")
                    setMessageColor("orange")
                    throw new Error("Error " + res.status + ": " + res.statusText);
                }else if(res.status===401){
                    setmessage("Unauthorized entry, relogin.")
                    setMessageColor("blue")
                    throw new Error("Error " + res.status + ": " + res.statusText);

                }else if(!res.ok){
                    setmessage("Ops, something went wrong!" +  res.status)
                    setMessageColor("red")
                    throw new Error("Error " + res.status + ": " + res.statusText);

                }
                console.log(res);
                return res.text();
            })
            .then((data) => {
                setmessage("Product has been added!")
                setMessageColor("green")
            })
            .catch((err) =>{
                console.log(err)
              //setmessage(err.code.toString)
             //   alert("Ops, something went wrong!")

            } );

    };

    const handleAddProduct = () => {

        if(productName ==="" || authorName ===""|| numberOfPages ===""|| description ===""|| price ==="")
        {
            setmessage("Fill blanks needed")
            setMessageColor("red")
        }else{
            sendRequest("products/addProduct")
        }
    }
    return(

        <Form>

                <label htmlFor="">
                    <h1>
                        <center>ADD</center>
                    </h1>
                </label><br/><br/>
<Row>
            <Form.Group as={Col}>
                        <Form.Label>Book Name *</Form.Label>
                        <Form.Control  type="text" placeholder="Kaşağı" onChange={(event) => handleProductName(event.target.value)} /><br/>
                        <Form.Label>Author Name *</Form.Label>
                        <Form.Control type="text" placeholder="Ömer Seyfettin" onChange={(event) => handleAuthorName(event.target.value)} />
                         <br/>

                          <Form.Label>Number of Pages *</Form.Label>
                              <Form.Control type="number" placeholder="93" onChange={(event) => handlenumberOfPages(event.target.value)} />
                        <br/>
                        <Form.Label>Language</Form.Label>
                        <Form.Select onChange={(event) => handleLanguage(event.target.value)}>
                            <option value="">Choose language</option>
                            <option value="Turkish">Turkish</option>
                            <option value="English">English</option>
                        </Form.Select>





            </Form.Group> <Form.Group as={Col}>
                        <Form.Label>Image Url</Form.Label>
                        <Form.Control type="text" placeholder="http://" onChange={(event) => handleImageUrl(event.target.value)} /><br/>
                        <Form.Label>ISBN</Form.Label><br/>
                        <Form.Control type="text" placeholder="ISBN" onChange={(event) => handleISBN(event.target.value)} />



                    <br/>
                    <Form.Label>Publisher</Form.Label>
                    <Form.Control rows type="text" placeholder="mcan123" onChange={(event) => handlePublisher(event.target.value)} />
                    <br/>
                    <Form.Label>Publish Date</Form.Label>
                    <Form.Control type="text" placeholder="" onChange={(event) => handlePublishedDate(event.target.value)} />
                    </Form.Group></Row> <br/>
                    <Form.Label>Price *</Form.Label>
                    <Form.Control type="number"  placeholder="25" onChange={(event) => handlePrice(event.target.value)} />
            <br/>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="number" placeholder="17" onChange={(event) => handleStock(event.target.value)} />


                    <br/>
                    <Form.Label>Description *</Form.Label><br></br>
                    <Form.Control as="textarea" rows={3}  onChange={(event) => handleDescription(event.target.value)} style={{ minWidth: 200 }}/>
                    <center>
                        <br/>
                        <Button variant="dark"  onClick={handleAddProduct}>Add Product</Button></center>
                    <Form.Text className="text-muted mb-33">

                        <br/>
                    </Form.Text>





            {message !=="" ? <Message color={messageColor}>{message}</Message> : null}
        </Form>


    )
}

export default AddProduct;