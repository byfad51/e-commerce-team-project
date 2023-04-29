import React, {useEffect, useState} from 'react'
import {Grid, Image,Icon, Container, Segment, Button,  Card} from 'semantic-ui-react'
import Navbar from "../components/Navbar";
import ProductSearch from "./ProductSearch"

function ProductList() {
    const [data, setData] = useState([]);
    const [favData, setFavData] = useState([]);
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
        getFavData();

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
    const handleFav = async (productId) => {
        if (localStorage.getItem("authorized") === "true") {
            const url = "http://localhost:8080/users/favProduct?productId=" + productId + "&userId="+localStorage.getItem("currentUser") ;
            const data = {
                productId: productId,
                userId: localStorage.getItem("currentUser")
            };
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': localStorage.getItem("tokenKey")
                },
             //   body: JSON.stringify(data)
            })
                .then(response => {
                    //response.status
                    getFavData()
                })
                .then(data => console.log(data))
                .catch(error => console.error(error));
        }


        }
   /* const getFav = async () => {
        if (localStorage.getItem("authorized") === "true") {
            const url = "http://localhost:8080/users/getFavProduct?userId=" + localStorage.getItem("currentUser");
            const data = {
                userId: localStorage.getItem("currentUser")
            };
             fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': localStorage.getItem("tokenKey")
                },
                //   body: JSON.stringify(data)
            })
                .then(async response => {
                    const dataa = await response.json()
                    setFavData(dataa)
                    console.log(favData)

                })

                .catch(error => console.error(error));
        }
    }*/


        const getFavData = async () => {
            const url = "http://localhost:8080/users/getFavProduct?userId=" + localStorage.getItem("currentUser");
            try {
                const response = await fetch(url, {
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        'Authorization': localStorage.getItem("tokenKey")
                    },
                })
                const data = await response.json();
                setFavData(data);
                console.log(favData)
            } catch (error) {
                console.error(error);
            }
        }


    console.log(favData)

    const myProductCard = (item) => (

<>
                <Card key={item.productName} >

                    {item.imageUrl!== ""? <a href={"/detail?id="+ item.id}><Image  height="300" src={item.imageUrl} /></a>:
                        <a href={"/detail?id="+ item.id}><Image  height="300"   src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}/></a>
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
                           {localStorage.getItem("authorized") ==="true"?
                               <Button onClick={()=>{
                                   handleFav(item.id)}
                               } inverted>{favData.find((favItem) => favItem.id === item.id)?
                                   <Icon fitted color='red' size='large' name='heart' outline/>:
                                   <Icon fitted color='red' size='large' name='heart outline' outline/>}</Button>:null}
                       </center>



                    </Card.Content>

                </Card>
        </>
    )
    //
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