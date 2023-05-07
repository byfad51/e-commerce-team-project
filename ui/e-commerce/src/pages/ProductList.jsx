import React, {useEffect, useState} from 'react'
import {Grid, Image, Icon, Container, Segment, Button, Card, Dropdown, Select} from 'semantic-ui-react'
import Navbar from "../components/Navbar";
import ProductSearch from "./ProductSearch"
import {useNavigate} from "react-router-dom";

function ProductList() {
    const [data, setData] = useState([]);
    const [favData, setFavData] = useState([]);
    const [kacTane, setKacTane] = useState(24);
    const [showClick, setShowClick] = useState(false);
    const [showButtonText, setShowButtonText] = useState("SHOW MORE PRODUCT");
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();


    const url = 'http://localhost:8080/products/getAllProducts';

    useEffect(() => {
        getFavData();
        getAllProduct();
        console.log("calisti set")
    }, []);
        const getAllProduct = async () => {
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



    const addCart = (productId) =>
        {
            console.log(productId)

                if (localStorage.getItem("authorized") === "true") {
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
                            alert("ADDED")
                        })
                        .then(data => console.log(data))
                        .catch(error => console.error(error));
                }else{
                    navigate("/login")
                }



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

                    {item.imageUrl!== ""? <a href={"/detail?id="+ item.id}><Image  height="300" src={item.imageUrl} /></a>:
                        <a href={"/detail?id="+ item.id}><Image  height="300"   src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}/></a>
                   }
<div onClick={() => setOpen(true)}>
                    <Card.Content>


                                <Card.Header><a href={"/detail?id="+ item.id} ><p >{item.productName}</p></a></Card.Header>
                                <Card.Meta>{item.authorName}</Card.Meta>



                    </Card.Content>
</div>
                    <Card.Content extra>
                       <center>
                           <div>
                               <Icon fitted name='comment outline' />
                               <span style={{ marginLeft: '5px' }}>15</span>
                               <span style={{ marginLeft: '10px' }} />
                               <Icon fitted color='yellow' name='star'/>
                               <span style={{ marginLeft: '5px' }}>4.5</span>
                           </div>

                           <br/>
                               <Button  inverted color='instagram' onClick={() => addCart(item.id)}>
                           <Icon circular fitted  color='white'  name='cart arrow down'  /> {item.price} ₺
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

    const [selectedFilter, setSelectedFilter] = useState(1);
    const [selectedSorting, setSelectedSorting] = useState(1);
    useEffect(() => {/////////////
        setShowClick(false)
       console.log("calisti filter")
        setSelectedSorting(1)
        if(selectedFilter === 1){
            getAllProduct()
        }else if(selectedFilter=== 2){
            setData(getFavData())
            setData(favData)
            console.log(data)
        }else if(selectedFilter=== 3){
            console.log("calisti filter3")

        }else{
            console.log("calisti filter4")
        }
        console.log(data)
    }, [selectedFilter]);

    useEffect(() => {//////////////
        console.log(data)
        if(selectedSorting === 1){
            const sortedData = [...data].sort((a, b) => a.publishedDate - b.publishedDate);
            setData(sortedData);
            console.log("calisti 1")
        }else if(selectedSorting=== 2){
            const sortedData = [...data].sort((b, a) => a.publishedDate - b.publishedDate);
            setData(sortedData);
            console.log("calisti 2")
        }else if(selectedSorting=== 3){
            const sortedData = [...data].sort((a, b) => a.price - b.price);
            setData(sortedData);
            console.log("calisti 3")

        }else if(selectedSorting=== 4){
            const sortedData = [...data].sort((b,a) => a.price - b.price);
            setData(sortedData);
            console.log("calisti 4")

        }else if(selectedSorting=== 5){
            const sortedData = [...data].sort((a,b) =>new Date(a.createdAt) - new Date(b.createdAt));
            setData(sortedData);
            console.log("calisti 5")
        }else if(selectedSorting=== 6){
            const sortedData = [...data].sort((b,a) => new Date(a.createdAt) -new Date(b.createdAt));
            setData(sortedData);
            console.log("calisti 6")
        }else{
        }
    }, [selectedSorting]);
    function handleSelectionFilter(e, { name, value }) {
        setSelectedFilter(value);
    }
    function handleSelectionSorting(e, { name, value }) {
        setSelectedSorting(value);
    }
    const filterOptions = [
        { key: 1, text: 'All books', value: 1 },

        { key: 3, text: 'Search author', value: 3 },
        { key: 4, text: 'Search category', value: 4 },
        { key: 5, text: 'Search with year range', value: 5 },
    ]
    if (localStorage.getItem("authorized") === "true") {
        filterOptions.push(  { key: 2, text: 'My Favorites (user needed)', value: 2 })
    }
    const sortingOptions = [
        { key: 1, text: 'First old published', value: 1 },
        { key: 2, text: 'First new published', value: 2 },
        { key: 3, text: 'First cheaper', value: 3 },
        { key: 4, text: 'First more expensive', value: 4 },
        { key: 5, text: 'First old added', value: 5 },
        { key: 6, text: 'First new added', value: 6 },
        { key: 7, text: 'First higher average rating', value: 7 },
        { key: 8, text: 'First higher sold', value: 8 },
    ]
    return (<Container>

            <Navbar />
            <Segment>
                <Grid >
                    <Grid.Row columns={3}>
                        <Grid.Column >
                            <ProductSearch style={{width: "100%"}} dataa={data} />
                        </Grid.Column>
                        <Grid.Column>
                            <Dropdown style={{width: "100%"}} value={selectedFilter}   onChange={handleSelectionFilter}  clearable options={filterOptions} selection/>
                        </Grid.Column>

                        <Grid.Column>
                            <Dropdown style={{width: "100%"}}  value={selectedSorting}  onChange={handleSelectionSorting} placeholder={"First old books"} clearable options={sortingOptions} selection />
                        </Grid.Column>


                    </Grid.Row>
                </Grid>



                <br/>
                <Card.Group doubling itemsPerRow={5} stackable>

            {data.slice(0, kacTane).map((item, index)=> (
                myProductCard(item,index)
            ))}
        </Card.Group><br/>
           <center> <Button inverted color='linkedin' onClick={showMoreProduct} disabled={showClick}>{showButtonText}</Button></center>
            </Segment></Container>);
}

export default ProductList;