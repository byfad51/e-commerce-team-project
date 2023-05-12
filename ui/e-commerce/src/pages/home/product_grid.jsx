import React, {useState} from 'react';
import {Button, Icon, Card} from "semantic-ui-react";
import {Carousel} from "react-bootstrap";
import HomeProductCard from "./product_card";

function ProductGrid(props) {
    const [data, setData] = useState(null);

    React.useEffect(() => {

        setData(props.data)

    }, [props.data])

    console.log(data)

    return (
        <Card.Group doubling itemsPerRow={5} stackable>

            {data !== null ?
                data.map((item, index)=> (
                    <HomeProductCard item={item}/>
                )):null}
        </Card.Group>
    );
}

export default ProductGrid;
