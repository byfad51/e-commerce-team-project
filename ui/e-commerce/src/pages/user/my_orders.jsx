import {useEffect, useState} from "react";
import {Button, Card, Label, Segment} from "semantic-ui-react";
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
                <Card.Content><div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Card.Header>{`${item.city} adress`}</Card.Header>
                    <div>{item.status==="PENDING"?
                        <Label  color='olive'>
                            {item.statusMessage}
                        </Label>:null
                    }{item.status==="APPROVED"?
                        <Label inverted color='yellow' >
                            {item.statusMessage}
                        </Label>:null
                    }{item.status==="CANCELLED"?
                        <Label inverted color='red'>
                            {item.statusMessage}
                        </Label>:null
                    }{item.status==="REJECTED"?
                        <Label inverted color='red'>
                            {item.statusMessage}
                        </Label>:null
                    }{item.status==="COMPLETED"?
                        <Label inverted color='green'>
                            {item.statusMessage}
                        </Label>:null
                    }</div>
                </div>

                    <Card.Meta> {`${item.firstname} - ${item.lastname} - ${item.phoneNumber} `}</Card.Meta>
                    <Card.Description>statusMessage
                        {`${item.fullAddress} ${item.postalCode} ${item.neighbourhood} ${item.district} ${item.city}`}
                        <br/><b>{item.totalPrice.toFixed(2)}₺ - {item.date}</b>
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