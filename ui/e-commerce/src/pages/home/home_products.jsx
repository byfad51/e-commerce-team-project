import React, {useState} from 'react';
import {Button, Icon, Message} from "semantic-ui-react";
import {Carousel} from "react-bootstrap";
import HomeProductCard from "./product_card";
import ProductGrid from "./product_grid";

 function MyCarousel(props) {
     const [data, setData] = useState(null);

     React.useEffect(() => {

         setData(props.data)

     }, [props.data])



    return (
        <Carousel interval={3000} indicators={false} style={{width:"100%"}} variant="dark">

            <Carousel.Item>

                {data !== null? <ProductGrid data={data.slice(0,5)}/>: null}
            </Carousel.Item>
            <Carousel.Item>

                {data !== null? <ProductGrid data={data.slice(5,10)}/>: null}
            </Carousel.Item>
            <Carousel.Item>

                {data !== null? <ProductGrid data={data.slice(10,15)}/>: null}
            </Carousel.Item>
        </Carousel>
    );
}

export default MyCarousel;
