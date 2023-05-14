import React, {useEffect, useState} from 'react'
import {Grid, Image, Icon, Container, Segment, Button, Card, Dropdown, Select, Pagination} from 'semantic-ui-react'
import Navbar from "../../components/Navbar";
import ProductSearch from "./ProductSearch"
import {useNavigate} from "react-router-dom";
import Popup from "../../components/pop_message";
import {Col, Form, Row} from "react-bootstrap";

function ProductList() {
    const [data, setData] = useState([]);
    const [favData, setFavData] = useState([]);
    const [kacTane, setKacTane] = useState(24);
    const [showClick, setShowClick] = useState(false);
    const [showButtonText, setShowButtonText] = useState("SHOW MORE PRODUCT");
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();

    const [showPopup1, setShowPopup1] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [showPopup3, setShowPopup3] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const [selectedSorting, setSelectedSorting] = useState("NEWEST");

    function handleSelectionSorting(e, { name, value }) {
        setSelectedSorting(value);
    }

    const sortingOptions = [
        { key: 1, text: 'NEWEST', value: "NEWEST" },
        { key: 2, text: 'OLDEST', value: "OLDEST" },
        { key: 3, text: 'BEST SELLING', value: "BEST_SELLING" },
        { key: 4, text: 'PRICE HIGH TO LOW', value: "PRICE_HIGH_TO_LOW" },
        { key: 5, text: 'PRICE LOW TO HIGH', value:"PRICE_LOW_TO_HIGH" },
        { key: 6, text: 'REVIEW HIGH TO LOW', value: "REVIEW_HIGH_TO_LOW" },
        { key: 7, text: 'RATING HIGH TO LOW', value: "RATING_HIGH_TO_LOW" },
        { key: 8, text: 'NEWLY PUBLISHED TO OLDLY PUBLISHED', value: "NEWLY_PUBLISHED_TO_OLDLY_PUBLISHED"},
        { key: 9, text: 'OLDLY PUBLISHED TO NEWLY PUBLISHED', value: "OLDLY_PUBLISHED_TO_NEWLY_PUBLISHED"},
    ]
    const [authorName, setAuthorName] = useState("")
    const [publisherName, setPublisherName] = useState("")
    const [language, setLanguage] = useState("")
    const [minPublishedYear, setMinPublishedYear] = useState(0)
    const [maxPublishedYear, setMaxPublishedYear] = useState(2025)
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState("")
    const [minAverageStar, setMinAverageStar] = useState("")
    const [maxAverageStar, setMaxAverageStar] = useState(5)

    const handleAuthorName= (value) => {setAuthorName(value) }
    const handlePublisherName= (value) => {setPublisherName(value) }
    const handleLanguage= (value) => {setLanguage(value) }
    const handleMinPublishedYear= (value) => {setMinPublishedYear(value) }
    const handleMaxPublishedYear= (value) => {setMaxPublishedYear(value) }
    const handleMinPrice = (value) => {setMinPrice(value) }
    const handleMaxPrice = (value) => {setMaxPrice(value) }
    const handleMinAverageStar = (value) => {setMinAverageStar(value) }
    const handleMaxAverageStar = (value) => {setMaxAverageStar(value) }

    const [maxPageNumber, setMaxPageNumber] = useState(1)
    let pageNumber=1

    const handlePaginationChange = (e, { activePage }) => {
        pageNumber = activePage;
        navigate("/products?page="+pageNumber)
    }
    const searchParams = new URLSearchParams(window.location.search);
    pageNumber = parseInt(searchParams.get('page'));
    //setPageNumber(pageInUrl)

    const [getProductUrl, setGetProductUrl] = useState("http://localhost:8080/products/getProductsByParams?page="+(pageNumber-1)+"&sortByParam="+selectedSorting)


    const handleFilterButton = () => {

        if(authorName === undefined || authorName === null) {
            setAuthorName("");
        }
        if(publisherName === undefined || publisherName === null) {
            setPublisherName("");
        }
        if(language === undefined || language === null) {
            setLanguage("");
        }
        if(minPublishedYear === undefined || minPublishedYear === null || !(minPublishedYear > 0)) {
            setMinPublishedYear(0);
        }
        if(maxPublishedYear === undefined || maxPublishedYear === null || !(maxPublishedYear > 0)) {
            setMaxPublishedYear(2025);
        }
        if(minPrice === undefined || minPrice === null || !(minPrice > 0)) {
            setMinPrice(0);
        }
        if(maxPrice === undefined || maxPrice === null || !(maxPrice > 0)) {
            setMaxPrice("");
        }
        if(minAverageStar === undefined || minAverageStar === null || !(minAverageStar > 0)) {
            setMinAverageStar("");
        }
        if(maxAverageStar === undefined || maxAverageStar === null || !(maxAverageStar > 0)) {
            setMaxAverageStar("");
        }
        if(!(pageNumber>0)){
                pageNumber = 1;
        }
       setGetProductUrl( `http://localhost:8080/products/getProductsByParams?page=${pageNumber-1}&sortByParam=${selectedSorting}&authorName=${authorName}&publisherName=${publisherName}&language=${language}&startYear=${minPublishedYear}&endYear=${maxPublishedYear}&minPrice=${minPrice}&maxPrice=${maxPrice}&minRating=${minAverageStar}&maxRating=${maxAverageStar}`);

    }
    useEffect(() => {
        handleFilterButton()
        if(!(pageNumber > 0) || pageNumber === "" || pageNumber===null|| pageNumber.isNaN){
            pageNumber=1
        }

    }, [handleFilterButton]);
    useEffect(() => {
        if(pageNumber < 1 || pageNumber === "" || pageNumber===null){
            pageNumber=1
            navigate("/products?page="+pageNumber)
        }
        getFavData();
        getAllProduct();
        console.log("calisti set")
    }, []);

    useEffect(() => {
        getAllProduct();
    }, [getProductUrl]);


        const getAllProduct = async () => {
            console.log(getProductUrl)
            try {
                const response = await fetch(getProductUrl, {
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        'Authorization': localStorage.getItem("tokenKey")
                    },
                })
                const data = await response.json();
                console.log(data)
                setData(data.content);
                setMaxPageNumber(data.totalPages)
            } catch (error) {
                console.error(error);
            }
        };



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



    return (<Container style={{width:"75%"}}>
<>{showPopup1 && (
    <Popup
        buttonText1={"Go to Login"}
        buttonColor1={"green"}
        buttonText2={"Cancel"}
        buttonColor2={"red"}
        errorMessageTitle={"Session is Needed"}
        errorMessage={"You need to login to use cart."}
        icon={'warning circle'}
        onClose1={()=> {
            navigate("/login")
            setShowPopup1(false)
        }}
        onClose2={()=> {
            setShowPopup1(false)
        }}
    />
)}</><>{showPopup2 && (
        <Popup
            buttonText1={"LOOK NEW BOOKS"}
            buttonColor1={"green"}
            buttonText2={"GO TO CART"}
            buttonColor2={"yellow"}
            errorMessageTitle={"BOOK ADDED is Succesful"}
            errorMessage={"The book is in your cart now."}
            icon={'add'}
            onClose1={()=> {

                setShowPopup2(false)
            }}
            onClose2={()=> {
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
                onClose1={()=> {
                    setShowPopup3(false)
                }}

            />
        )}</>
            <Navbar />
            <Segment>
                <Grid >
                    <Grid.Row columns={3}>
                        <Grid.Column >
                            <ProductSearch style={{width: "100%"}} dataa={data} />
                        </Grid.Column>
                        <Grid.Column>
                            <center> <Button style={{width:"100%"}}inverted color="green" onClick={()=>setShowFilters(!showFilters)} disabled={showClick}>FILTERS</Button></center>
                        </Grid.Column>

                        <Grid.Column>
                            <Dropdown style={{width: "100%"}}  value={selectedSorting}  onChange={handleSelectionSorting} clearable options={sortingOptions} selection />
                        </Grid.Column>

                        {showFilters ? <> <Form>

                            <Row>
                                <Col>
                                    <Form.Label>Author Name</Form.Label>
                                    <Form.Control type="text" value={authorName}  onChange={(event) => handleAuthorName(event.target.value)} />

                                </Col>
                                <Col>
                                    <Form.Label>Publisher</Form.Label>
                                    <Form.Control type="text" value={publisherName} onChange={(event) => handlePublisherName(event.target.value)} />

                                </Col>
                                <Col>
                                    <Form.Label>Language</Form.Label>
                                    <Form.Select value={language}  onChange={(event) => handleLanguage(event.target.value)}>
                                        <option value="">Choose language</option>
                                        <option value="Turkish">Turkish</option>
                                        <option value="English">English</option>
                                    </Form.Select>

                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Label>Min Published Year</Form.Label>
                                    <Form.Control type="number" value={minPublishedYear} placeholder="25" onChange={(event) => handleMinPublishedYear(event.target.value)} />

                                </Col>
                                <Col>
                                    <Form.Label>Max Published Year</Form.Label>
                                    <Form.Control type="number" value={maxPublishedYear} placeholder="25" onChange={(event) => handleMaxPublishedYear(event.target.value)} />

                                </Col>
                                <Col>
                                    <Form.Label>Min Price</Form.Label>
                                    <Form.Control type="number" value={minPrice}  placeholder="25" onChange={(event) => handleMinPrice(event.target.value)} />

                                </Col>
                                <Col>
                                    <Form.Label>Max Price</Form.Label>
                                    <Form.Control type="number"  value={maxPrice} onChange={(event) => handleMaxPrice(event.target.value)} />

                                </Col>
                                <Col>
                                    <Form.Label>Min Average Star</Form.Label>
                                    <Form.Control type="number"  value={minAverageStar} onChange={(event) => handleMinAverageStar(event.target.value)} />

                                </Col>
                                <Col>
                                    <Form.Label>Max Average Star</Form.Label>
                                    <Form.Control type="number"  value={maxAverageStar} onChange={(event) => handleMaxAverageStar(event.target.value)} />

                                </Col>

                            </Row><br/>
                    <center><Button onClick={handleFilterButton} secondary>SEND</Button></center>
                        </Form></>:null}
                    </Grid.Row>

                </Grid>



                <br/>
                <Card.Group doubling itemsPerRow={5} stackable>

            {data.map((item, index)=> (
                myProductCard(item,index)
            ))}
        </Card.Group><br/>
           <center> <Pagination defaultActivePage={pageNumber} onPageChange={handlePaginationChange} totalPages={maxPageNumber} /></center>
            </Segment></Container>);
}

export default ProductList;