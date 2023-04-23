import React, {useEffect, useState} from 'react'
import {Grid, Image,Icon, Container, Segment, Button,  Card} from 'semantic-ui-react'
import Navbar from "../components/Navbar";
import ProductSearch from "./ProductSearch"

function ProductList() {
    const [data, setData] = useState([]);
    const [kacTane, setKacTane] = useState(24);
    const [showClick, setShowClick] = useState(false);
    const [showButtonText, setShowButtonText] = useState("SHOW MORE PRODUCT");
    const [open, setOpen] = useState(false)


    const url = 'http://localhost:8080/products/getAllProducts';

    useEffect(() => {
        const postData = async () => {
            try {
                const response = await fetch(url, {
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        'Authorization': localStorage.getItem("tokenKey")
                    },
                })
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error(error);
            }
        };

        postData();
    }, []);


    const addCart = (item) =>
        {
            console.log(item)

        }

    const showMoreProduct = () => {
        setShowClick(true)
        setKacTane(kacTane+12)
        if(data.length >= kacTane){
            setShowClick(false)
        }else{
            setShowButtonText("All Products were Showed")
        }
    }
    const myProductCard = (item) => (

<>
                <Card key={item.productName} >

                    {item.imageUrl!== ""? <Image  height="300" src={item.imageUrl} />:
                         <img  height="300"  src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}/>
                   }
<div onClick={() => setOpen(true)}>
                    <Card.Content>


                                <Card.Header><a href={"/detail?id="+ item.id}>{item.productName}</a></Card.Header>
                                <Card.Meta>{item.authorName}</Card.Meta>



                    </Card.Content>
</div>
                    <Card.Content extra>
                       <center>
                           <Icon  fitted  name='comment outline'/> 15
                           <Icon  fitted  color='yellow' name='star'/> 4.5


                           <br/><Button  inverted color='orange' onClick={() => addCart(item.productName)}>
                           <Icon circular fitted  color='brown'  name='cart arrow down'  /> {item.price} ₺
                        </Button>                <br/>
                           <Button inverted><Icon  fitted  color='red' size='large' name='heart outline' outline/></Button>

                       </center>



                    </Card.Content>

                </Card>
        </>
    )
    console.log(data)
    return (<Container>

            <Navbar />
            <Segment>
                <Grid >
                    <Grid.Row columns={2}>
                        <Grid.Column >
                            <ProductSearch style={{width: "100%"}} dataa={data} />
                        </Grid.Column>
                        <Grid.Column>
                          <Button style={{width: "100%"}}>Filters and sorting will be added.</Button>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>



                <br/>
                <Card.Group doubling itemsPerRow={5} stackable>

            {data.slice(0, kacTane).map((item, index)=> (
                myProductCard(item,index)
            ))}
        </Card.Group><br/>
           <center> <Button inverted color='brown' onClick={showMoreProduct} disabled={showClick}>{showButtonText}</Button></center>
            </Segment></Container>);
}

export default ProductList;