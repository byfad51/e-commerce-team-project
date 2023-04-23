import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import {Container, Label, Segment} from "semantic-ui-react";

function ProductDetails() {
    const [productData, setProductData] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const searchParams = new URLSearchParams(window.location.search);
    const productId = searchParams.get('id');

    const url = `http://localhost:8080/products/getProductById/${productId}`;

    useEffect(() => {
        const postData = async () => {

                const response = await  fetch(url)
                    .then(async response => {
                        if (response.status !== 302) {

                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        setErrorMessage("")
                        const data = await response.json();
                        setProductData(data)
                        console.log(data)
                    })
                    .catch(error => {
                        setErrorMessage("Product not found")
                        console.error(`Error: ${error.message}`)
                    })

        };

        postData();
    }, []);
    const productNotFound = () => (
        <>
           <Label><h1>404: {errorMessage}</h1></Label>

        </>
    )
    const productFound =() => (
        <><h1>{productData.productName}</h1><br/>
            <img src={productData.imageUrl}/><br/>

            {productData.price}<br/>
            {productData.authorName}<br/>
            {productData.description}<br/>
        </>
    )
    return (

        <Container>
            <Navbar />

            <Segment><center>
                {errorMessage!=="" ? productNotFound():productFound() }
            </center> </Segment>
                </Container>
    );
}

export default ProductDetails;
