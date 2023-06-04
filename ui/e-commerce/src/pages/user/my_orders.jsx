import {useEffect, useState} from "react";
import {Button, Card, Segment} from "semantic-ui-react";
import {useAsyncValue} from "react-router-dom";

function MyOrders() {

    const [orders, setOrders] = useState([])

 useEffect(() => {
     const getUserOrders = async () => {
         await fetch('http://localhost:8080/order/getUserOrders/' + localStorage.getItem("currentUser"), {
             headers: {
                 Authorization: localStorage.getItem("tokenKey"),
             },
         })
             .then(response => response.json())
             .then(data => {
                 setOrders(data);
                 console.log(data);
             })
             .catch(error => console.error(error));
     }
     getUserOrders()


    }, []);
    const orderCard = (item) => (<>
        <Card.Group>
            <Card style={{width:"100%"}}>
                <Card.Content>
                    <Card.Header>{`${item.city} adress`}</Card.Header>
                    <Card.Meta> {`${item.firstname} - ${item.lastname} - ${item.phoneNumber} `}</Card.Meta>
                    <Card.Description>
                        {`${item.fullAddress} ${item.postalCode} ${item.neighbourhood} ${item.district} ${item.city}`}
                        <br/><b>{item.totalPrice}₺ - {item.date}</b>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    {item.orderItems.map(value =>
                        <a href={"/detail?id="+ value.product.id}><img src={value.product.imageUrl} alt={value.product.productName} width="100" height="150"/>&nbsp;&nbsp;</a>
                    )}
                </Card.Content>
            </Card>
        </Card.Group>
    </>)
    return (<>
        <><Segment>{orders.map(value =>
            orderCard(value)
        )}</Segment></>

    </>);
}

export  default MyOrders;