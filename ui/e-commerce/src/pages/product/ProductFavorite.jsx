import React, {useEffect, useState} from 'react'
import {Grid, Image, Icon, Container, Segment, Button, Card, Dropdown, Select} from 'semantic-ui-react'
import Navbar from "../../components/Navbar";
import ProductSearch from "./ProductSearch"
import {useNavigate} from "react-router-dom";
import Popup from "../../components/pop_message";

function ProductFavorite() {
    const [favData, setFavData] = useState([]);
    const [kacTane, setKacTane] = useState(24);
    const [showClick, setShowClick] = useState(false);
    const [showButtonText, setShowButtonText] = useState("SHOW MORE PRODUCT");
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();

    const [showPopup1, setShowPopup1] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [showPopup3, setShowPopup3] = useState(false);

    useEffect(() => {

        const timeout = setTimeout(() => {
            if(localStorage.getItem("authorized")!=="true") {
                navigate('/login');
            }
        }, 5000);

        return () => clearTimeout(timeout);
    }, [navigate]);

    const url = 'http://localhost:8080/products/getAllProducts';

    useEffect(() => {
        getFavData();

    }, []);


    const addCart = (productId) =>
    {
        console.log(productId)

        if (localStorage.getItem("authorized") === "true") {
            setShowPopup1(false)
            const url = "http://localhost:8080/cart/addToCart?productId=" + productId ;
            const data = {
                productId: productId
            };
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': localStorage.getItem("tokenKey")
                },
                // body: JSON.stringify(data)
            })
                .then(response => {
                    //response.status
                    console.log(response.status)
                    if(response.status===200){
                        setShowPopup2(true)
                    }else{
                        setShowPopup3(true)
                    }
                })
                .then(data => {
                    console.log(data)

                })
                .catch(error => console.error(error));
        }else{
            setShowPopup1(true)
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
                            <>   {localStorage.getItem("authorized") ==="true"?
                                <Button onClick={()=>{
                                    handleFav(item.id)}
                                } inverted>{favData.find((favItem) => favItem.id === item.id)?
                                    <Icon fitted color='red' size='large' name='heart' outline/>:
                                    <Icon fitted color='red' size='large' name='heart outline' outline/>}</Button>:null}</>
                        </div>

                        <br/>
                        <Button  inverted color='instagram' onClick={() => addCart(item.id)}>
                            <Icon circular fitted  color='white'  name='cart arrow down'  /> {item.price} ₺
                        </Button>                <br/>

                    </center>



                </Card.Content>

            </Card>
        </>
    )




    return ( localStorage.getItem("authorized")==="true" ?
    <Container style={{width: "75%"}}>
        <>{showPopup1 && (
            <Popup
                buttonText1={"Go to Login"}
                buttonColor1={"green"}
                buttonText2={"Cancel"}
                buttonColor2={"red"}
                errorMessageTitle={"Session is Needed"}
                errorMessage={"You need to login to use cart."}
                icon={'warning circle'}
                onClose1={() => {
                    navigate("/login")
                    setShowPopup1(false)
                }}
                onClose2={() => {
                    setShowPopup1(false)
                }}
            />
        )}</>
        <>{showPopup2 && (
            <Popup
                buttonText1={"LOOK NEW BOOKS"}
                buttonColor1={"green"}
                buttonText2={"GO TO CART"}
                buttonColor2={"yellow"}
                errorMessageTitle={"BOOK ADDED is Succesful"}
                errorMessage={"The book is in your cart now."}
                icon={'add'}
                onClose1={() => {

                    setShowPopup2(false)
                }}
                onClose2={() => {
                    navigate("/cart")
                    setShowPopup2(false)
                }}
            />
        )}</>
        <>{showPopup3 && (
            <Popup
                buttonText1={"OKEY"}
                buttonColor1={"red"}
                errorMessageTitle={"Error - There is no book named like you choose."}
                errorMessage={"The book is in your cart now."}
                icon={'warning circle'}
                onClose1={() => {
                    setShowPopup3(false)
                }}

            />
        )}</>
        <Navbar/>
        <Segment>


            <br/>
            <Card.Group doubling itemsPerRow={5} stackable>

                {favData.map((item, index) => (
                    myProductCard(item, index)
                ))}
            </Card.Group><br/>
            <center><Button inverted color='linkedin' onClick={() => {
                navigate("/products")
            }
            }>"Show Products"</Button></center>
        </Segment></Container>:<center><h1>404 error - you need to login</h1></center>
);
}

export default ProductFavorite;