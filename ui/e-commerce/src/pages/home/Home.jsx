import { useNavigate } from 'react-router-dom';
import { Container} from 'react-bootstrap';
import Navbar from "../../components/Navbar";
import React, {useEffect, useState} from "react";
import '../../design/message/popup.css';
import {Button, Icon, Message} from "semantic-ui-react";
import Popup from "../../components/pop_message";
import MyCarousel from "./home_products";
import HomeProductCard from "./product_card";
import ProductGrid from "./product_grid";
import { Link } from 'react-router-dom';
import  "./Home_design.css"

 function Home() {
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const url = 'http://localhost:8080/products/getAllProducts';

    useEffect(() => {
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
    console.log(data)
     const kacUrun=15;
     const data1 = [...data].sort((b, a) => a.createdAt - b.createdAt).slice(0,kacUrun);
     const data2 = [...data].sort((b, a) => a.numberOfSales - b.numberOfSales).slice(0,kacUrun);
     const data3 = [...data].sort((b, a) => a.averageRating - b.averageRating).slice(0,kacUrun);
     const data4 = [...data].sort((b, a) => a.numberOfReviews - b.numberOfReviews).slice(0,kacUrun);
     const data5 = [...data].sort((b, a) => a.numberOfSales - b.numberOfSales).slice(0,1);

//
    return (
        <Container >
            <Navbar/>
            <br/>
            <div className="div-style-week" >

                {data !== null && data5.length > 0 && (
                    <div style={{ marginLeft: '60px'}}>
                        <Link to={`/detail?id= ${data5[0].id}`}>
                            <img src={data5[0].imageUrl} alt={data5[0].productName} style={{ maxWidth: '200px' }} />
                        </Link>
                    </div>
                )}
                <h1 className='div-style-week1' >Best Seller of the Week</h1>
            </div>


            <br/>
            <br/>   <h1 className='text-design-home'>New Releases</h1>
            {data1.length > 0 ? <MyCarousel data={data1} /> : <p>Loading data...</p>}
            <br/><br/><h1 className='text-design-home'>Best Sellers</h1>
            {data2.length > 0 ? <MyCarousel data={data2} /> : <p>Loading data...</p>}
            <br/><br/><h1 className='text-design-home'>Star-rated Products</h1>
            {data3.length > 0 ? <MyCarousel data={data3} /> : <p>Loading data...</p>}
            <br/><br/><h1 className='text-design-home'>Highly-rated products</h1>
            {data4.length > 0 ? <MyCarousel data={data4} /> : <p>Loading data...</p>}
        </Container>


    );
}

export default Home;