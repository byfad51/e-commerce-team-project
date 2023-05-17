import { Container} from 'react-bootstrap';
import Navbar from "../../components/Navbar";
import React, {useEffect, useState} from "react";
import '../../design/message/popup.css';

import MyCarousel from "./home_products";

import { Link } from 'react-router-dom';
import  "./Home_design.css"

 function Home() {


    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);
    const [data5, setData5] = useState([]);
     const [data, setData] = useState([]);

    const getData = async () => {
        await getAllProduct("NEWEST").then(value =>  setData1(value))

        await getAllProduct("BEST_SELLING").then(value =>  setData2(value))

        await getAllProduct("RATING_HIGH_TO_LOW").then(value =>  setData3(value))

        await getAllProduct("REVIEW_HIGH_TO_LOW").then(value =>  setData4(value))

        await getAllProduct("NEWLY_PUBLISHED_TO_OLDLY_PUBLISHED").then(value =>  setData5(value))


    }

     const getAllProduct = async (selectedSorting) => {
         const url = 'http://localhost:8080/products/getProductsByParams?sortByParam=' + selectedSorting;

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


     useEffect(() => {
         getData()

     }, []);
    /* console.log("data1")
     console.log(data1)
     console.log("data2")
     console.log(data2)
     console.log("data3")
     console.log(data3)
     console.log("data4")
     console.log(data4)
     console.log("data5")
     console.log(data5)*/
    return (
        <Container fluid style={{width:'70%'}}>
            <Navbar/>
            <br/>
            <div className="div-style-week" >

                { data2.length > 0 && (
                    <div style={{ marginLeft: '60px'}}>
                        <Link to={`/detail?id= ${data2[0].id}`}>
                            <img src={data2[0].imageUrl} alt={data2[0].productName} style={{ maxWidth: '200px' }} />
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
            <br/><br/><h1 className='text-design-home'>Star-rated Books</h1>
            {data3.length > 0 ? <MyCarousel data={data3} /> : <p>Loading data...</p>}
            <br/><br/><h1 className='text-design-home'>Highly-reviewed Books</h1>
            {data4.length > 0 ? <MyCarousel data={data4} /> : <p>Loading data...</p>}
            <br/><br/><h1 className='text-design-home'>Newly Published Books</h1>
            {data5.length > 0 ? <MyCarousel data={data5} /> : <p>Loading data...</p>}
        </Container>


    );
}

export default Home;