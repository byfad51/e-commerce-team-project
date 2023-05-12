import { useNavigate } from 'react-router-dom';
import { Container} from 'react-bootstrap';
import Navbar from "../../components/Navbar";
import {useEffect, useState} from "react";
import '../../design/message/popup.css';
import {Button, Icon, Message} from "semantic-ui-react";
import Popup from "../../components/pop_message";
import MyCarousel from "./home_products";
import HomeProductCard from "./product_card";

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


//
    return (
        <Container style={{width:"85%"}}>
            <Navbar/>
            <center><h1>Son Eklenenler</h1></center>
            {data1.length > 0 ? <MyCarousel data={data1} /> : <p>Loading data...</p>}
            <center><h1>Çok Satanlar</h1></center>
            {data2.length > 0 ? <MyCarousel data={data2} /> : <p>Loading data...</p>}
            <center><h1>Yıldızlı Ürünler</h1></center>
            {data3.length > 0 ? <MyCarousel data={data3} /> : <p>Loading data...</p>}
            <center><h1>Çok Yorum Alanlar</h1></center>
            {data4.length > 0 ? <MyCarousel data={data4} /> : <p>Loading data...</p>}
        </Container>


    );
}

export default Home;