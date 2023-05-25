import React, {useEffect, useState} from 'react'
import {Grid, Image, Icon, Container, Segment, Button, Card, Dropdown, Select, Pagination} from 'semantic-ui-react'
import Navbar from "../../components/Navbar";
import ProductSearch from "../product/ProductSearch"
import {useLocation, useNavigate} from "react-router-dom";
import Popup from "../../components/pop_message";

function MySearch() {
    const [data, setData] = useState([]);
    const [totalPageNumber, setTotalPageNumber] = useState(1);
    let [pageNumber, setPageNumber] = useState(1);
    const location = useLocation();

    const navigate = useNavigate();

    const [showPopup1, setShowPopup1] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [showPopup3, setShowPopup3] = useState(false);
    const searchParams = new URLSearchParams(window.location.search);
    const keyword = searchParams.get('w');
    const handlePaginationChange = (e, { activePage }) => {
        pageNumber = activePage;
        setPageNumber(activePage)
        // navigate("/products?page="+pageNumber)
        searchParams.set('page', pageNumber.toString()); // Yeni kategori değeri
        const newSearch = searchParams.toString();
        const newUrl = `${location.pathname}?${newSearch}`;
        window.history.replaceState(null, '', newUrl);

    }

    useEffect(() => {
        getData();

    }, [searchParams.get('w')]);

    useEffect(() => {
        getData();

    }, [pageNumber]);
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



    const getData = async () => {
        const url = "http://localhost:8080/products/search?keyword=" + keyword+"&page="+(pageNumber-1);
        try {
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            const data = await response.json();
            setData(data.content);
            setTotalPageNumber(data.totalPages)
            console.log(data)
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




    return (
            <>
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
<Container>
    <Navbar/>
                <Segment>


                    <br/>
                    <Card.Group doubling itemsPerRow={5} stackable>

                        {data.map((item, index) => (
                            myProductCard(item, index)
                        ))}
                    </Card.Group><br/>
                    <center> <Pagination defaultActivePage={pageNumber} onPageChange={handlePaginationChange} totalPages={totalPageNumber} /></center>
                </Segment></Container></>

    )
}

export default MySearch;