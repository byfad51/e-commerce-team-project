import {useEffect, useState} from "react";
import {Button, Card, Segment} from "semantic-ui-react";
import {useAsyncValue} from "react-router-dom";

function MyOrders() {

    const [orders, setOrders] = useState([])
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

 useEffect(() => {
     const getUserOrders = async () => {
         await fetch(`http://localhost:8080/order/getUserOrders/${localStorage.getItem("currentUser")}?page=${page}`, {
             headers: {
                 Authorization: localStorage.getItem("tokenKey"),
             },
         })
             .then(response => response.json())
             .then(data => {
                // setOrders(data.content);
                 setOrders(orders.concat(data.content))
                 setTotalPage(data.totalPages)
                 console.log(data);
             })
             .catch(error => console.error(error));
     }
     getUserOrders()


    }, [page]);

    const handleShowMore = () => {
            setPage(page + 1)
    }
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
        )}
          <center> {totalPage > page+1 ? <Button basic color='green' onClick={handleShowMore} content='SHOW MORE ORDER'/>:null}</center>
        </Segment></>

    </>);
}

export  default MyOrders;