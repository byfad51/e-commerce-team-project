import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar";
import {Button, Card, Container, Icon, Image, Segment} from "semantic-ui-react";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState([]);


    useEffect(() => {
        const getAllProduct = async () => {
            const url = 'http://localhost:8080/products/getProductsByParams';

            // console.log(url);

            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            });

            const data = await response.json();
            const v2 = await data.content;
            //console.log(v2);
            setData(v2);
            return v2;
        };
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/category/getAllCategories', {
                    headers: {
                        Authorization: localStorage.getItem("tokenKey")
                    }
                });
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        };
        getAllProduct();
        fetchData();
    }, []);
    const myProductCard = (item) => (

        <>
            <Card key={item.productName} >

                {item.imageUrl!== ""? <a href={"/detail?id="+ item.id}><Image  height="350" width="100%" src={item.imageUrl} /></a>:
                    <a href={"/detail?id="+ item.id}><Image  height="400"  width="100%" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}/></a>
                }
                <Card.Content style={{

                    height: 80
                }}>



                    <Card.Header><a href={"/detail?id="+ item.id} ><p style={{
                        lineHeight: "1.2",
                        maxHeight: "2.4em",
                        overflow: "hidden",
                        textOverflow: "ellipsis",

                    }}>{item.productName}</p>
                    </a></Card.Header>
                    <Card.Meta>{item.authorName}</Card.Meta>



                </Card.Content>
                <Card.Content extra>
                    <center>
                        <div>
                            <Icon fitted name='comment outline' size='large'/>
                            <span style={{ marginLeft: '5px' }}>{item.numberOfReviews}</span>
                            <span style={{ marginLeft: '10px' }} />
                            {(item.averageRating=== null || item.averageRating=== 0) ? null:
                                <><Icon fitted color='yellow' name='star' size='large' disabled/><span style={{ marginLeft: '5px' }}>{item.averageRating}</span></>}

                        </div>

                        <br/>
                                   <br/>

                    </center>



                </Card.Content>

            </Card>
        </>
    )

    return (
       <>
        <Container style={{width:"75%"}}><Navbar/><Segment>


            <center><h2>Our Categories</h2></center><br/>
            <div>
               <center><div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                   {categories.map((category) => (
                       <Button key={category.id} basic color='blue' style={{ marginRight: '10px', marginBottom: '10px' }}>
                           <a href={"/products?category=" + category.id}>{category.name}</a>
                       </Button>
                   ))}
               </div>

               </center>

            </div>
            <><h2><center>You can want to look these books</center></h2></>
            <br/>
            <Card.Group doubling itemsPerRow={5} stackable>

                {data.slice(0,10).map((item, index) => (
                    myProductCard(item, index)
                ))}
            </Card.Group><br/>
        </Segment>
        </Container></>
);
};

export default Categories;
