import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import {Button, Card, Container, Form, Grid, GridColumn, GridRow, Progress, Segment, Table} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";

function MyOrder() {
    const [cartItems, setCartItems] = useState([]);
    const [cartPrice, setCartPrice] = useState();
    const [cartTotal, setCartTotal] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('option1');
    const [progressPercent, setProgressPercent] = useState(33);
    const [progressMessage, setProgressMessage] = useState("Almost done");
    const [user, setUser] = useState([])

    const [allAddresses, setAllAddresses] = useState([]);

    const [selectedAddress, setSelectedAddres] = useState("0");

    const [isSelectedAddress, setIsSelectedAddress] = useState(false);
    const [isClickedPay, setIsClickedPay] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [securityNumber, setSecurityNumber] = useState("");
    const [code, setCode] = useState("");

    const [orderCompleted, setOrderCompleted] = useState(false);

    const handleCode = (value) => {
        setCode(value.target.value);
    }
    const handleFirstname = (value) => {
        setFirstName(value.target.value);
    }
    const handleLastName = (value) => {
        setLastName(value.target.value);
    }
    const handleCardNumber = (value) => {
        setCardNumber(value.target.value);
    }
    const handleSecurityNumber = (value) => {
        setSecurityNumber(value.target.value);
    }

    const username = localStorage.getItem("username");
    const getUserInfo = async () => {
        await fetch('http://localhost:8080/users/getUserByUsername?username=' + username)
            .then(response => response.json())
            .then(data => {
                setUser(data)
            })
            .catch(error => console.error(error));
    }

    const getCart = async () => {
        await fetch('http://localhost:8080/cart/getCart', {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': localStorage.getItem("tokenKey")
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(async data => {
                console.log(data)
                setCartItems(data.cartItems);
                setCartPrice(data.totalCartPrice);
                setCartTotal(data.totalPrice);
                cartItems.map(value => orderItems.push({productId: value.id, quantity: value.amount}))

            }).catch(error => {
                console.log(error)
                console.log("orderItems.length")
                console.log(orderItems.length)
                if(orderItems.length === 0){
                    navigate('/cart');
                }
            })


    }
    React.useEffect(() => {
        if(localStorage.getItem("authorized")==="false") {
            navigate('/login');
        }
        getUserInfo()
        getCart()

       // const totalPrice = cartItems.reduce((total, item) => total + item.price * item.amount, 0);
        console.log("cartItems")
        console.log(cartItems)

        console.log("cartTotal")
        console.log(cartTotal)
        console.log("cartPrice")
        console.log(cartPrice)
    }, [])
    const formatPrice = (price) => {
        // Format price as currency with 2 decimal places
        return `${price.toFixed(2)} TL`;
    };
    const myCart = (item) => (
  <tr key={item.id} className="cart-item">
          <td className="cart-item__detail">
              <img className="cart-item__image" src={item.imageUrl} alt={item.productName} />
              <div className="cart-item__info">
                  <div className="cart-item__name">{item.productName}</div>
                  <div className="cart-item__id">{item.authorName}</div>
                  <div className="cart-item__id">{ item.amount +"x"+formatPrice(item.price) +"="+ formatPrice(item.price * item.amount)}</div>
              </div>
          </td>
      </tr>
    )

    const getAllAddress = async () => {
        const url = `http://localhost:8080/address/getUserAddresses/${localStorage.getItem("currentUser")}`;


        await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("tokenKey")
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('İstek başarıyla tamamlandı');
                console.log('Gelen veri:', data);
                setAllAddresses(data)
            })
            .catch(error => {
                console.error('İstek hatası:', error);
            });

    }
    useEffect(() => {
        getAllAddress()

    }, []);

    const ratio = (index) => (
        <><input
            type="radio"
            name={index.toString()}
            value={index.toString()}
            checked={selectedAddress === index.toString()}
            onChange={() => setSelectedAddres(index.toString())}
        />Select this address</>
    )

    const selectAddress = () => {
      console.log(allAddresses[parseInt(selectedAddress)])
        setProgressPercent(66)
        setProgressMessage("Just one more step")
        setIsSelectedAddress(true)
    }
const addresses = () =>(
    <>{allAddresses.map((value, index) =>
        <><Card fluid color='green' meta={ratio(index)}  header={`${value.city} - ${value.firstname} - ${value.lastname} - ${value.phoneNumber}`} />
            </>)}</>
)
/*
*   "firstname": allAddresses[parseInt(selectedAddress)].firstname,
                "lastname": allAddresses[parseInt(selectedAddress)].lastname,
                "city": allAddresses[parseInt(selectedAddress)].city,
                "district": allAddresses[parseInt(selectedAddress)].district,
                "neighbourhood": allAddresses[parseInt(selectedAddress)].neighbourhood,
                "fullAddress": allAddresses[parseInt(selectedAddress)].fullAddress,
                "postalCode": allAddresses[parseInt(selectedAddress)].postalCode,
                "phoneNumber": allAddresses[parseInt(selectedAddress)].phoneNumber*/
    const complete = async () => {
        const myGiveOrderData = {
                "address": {
                "firstname": allAddresses[parseInt(selectedAddress)].firstname,
                "lastname": allAddresses[parseInt(selectedAddress)].lastname,
                "city": allAddresses[parseInt(selectedAddress)].city,
                "district": allAddresses[parseInt(selectedAddress)].district,
                "neighbourhood": allAddresses[parseInt(selectedAddress)].neighbourhood,
                "fullAddress": allAddresses[parseInt(selectedAddress)].fullAddress,
                "postalCode": allAddresses[parseInt(selectedAddress)].postalCode,
                "phoneNumber": allAddresses[parseInt(selectedAddress)].phoneNumber
            } ,
            "totalOrderPrice":cartTotal,
            "orderItems":orderItems
        }
console.log(myGiveOrderData)
        const url = `http://localhost:8080/order/postOrder`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("tokenKey")
                },
                body: JSON.stringify(myGiveOrderData),
            });

            if (response.ok) {
                console.log('İstek başarıyla tamamlandı');
                console.log(response.statusText);
                setProgressPercent(100)
                setProgressMessage('PAYING SUCCESSFULL - Your order is preparing. \n You can follow your order from profile/orders.' )
                setOrderCompleted(true)
            } else {
                console.log(response.statusText);
                throw new Error('İstek başarısız oldu');
            }
        } catch (error) {
            console.error('İstek hatası:', error);
        }
    }
    
return <><Container><Navbar/><Segment>


    <Grid columns={2} divided>
        <Grid.Row>
            <Grid.Column>
                {!orderCompleted ? cartItems.map(item => (
                    <>{myCart(item)}</>
                )):null}
            </Grid.Column>
            <Grid.Column>
                {!isSelectedAddress?<>{addresses()}
                    <center> <Button onClick={selectAddress} inverted color='green'>
                Select The Address
            </Button></center></>:null}

                {isSelectedAddress && !isClickedPay?<>
                    <Card fluid color='green'
                                           meta={`${allAddresses[parseInt(selectedAddress)].fullAddress} ${allAddresses[parseInt(selectedAddress)].postalCode} ${allAddresses[parseInt(selectedAddress)].neighbourhood} ${allAddresses[parseInt(selectedAddress)].district} ${allAddresses[parseInt(selectedAddress)].city}`}
                                           header={`${allAddresses[parseInt(selectedAddress)].firstname} - ${allAddresses[parseInt(selectedAddress)].lastname} - ${allAddresses[parseInt(selectedAddress)].phoneNumber}`} />

                    <Form >
                        <Form.Group widths={"equal"}>
                            <Form.Input
                                placeholder='First Name'
                                name='firstname'
                                value={firstName}
                               onChange={handleFirstname}
                            />
                            <Form.Input
                                placeholder='Last name'
                                name='lastname'
                               value={lastName}
                               onChange={handleLastName}
                            />
                        </Form.Group>
                        <Form.Group widths={"equal"}>
                            <Form.Input
                                placeholder='Card Number'
                                name='lastname'
                                value={cardNumber}
                                onChange={handleCardNumber}
                            />
                        </Form.Group>
                    <Form.Group widths={"equal"}>
                        <Form.Input
                            placeholder='Security Number'
                            name='lastname'
                            value={securityNumber}
                            onChange={handleSecurityNumber}
                        />
                    </Form.Group>


                        <center><Button onClick={event => {
                           // clickAddNewAddress()
                            setIsClickedPay(true)

                        }
                        } color='grey'>PAY</Button></center>
                    </Form>

                </>:null}

                {isClickedPay && !orderCompleted? <>
                    <Form >
                        If you gave a correct card, you will have a code.
                        <Form.Group widths={"equal"}>
                            <Form.Input
                                placeholder='give code sent your phone'
                                name='code'
                                value={setCode}
                                onChange={handleCode}
                            />
                        </Form.Group>


                        <center><Button onClick={event => complete()
                        } color='grey'>COMPLETE</Button></center>
                    </Form>

                </>:null}
            </Grid.Column>

        </Grid.Row>
    </Grid>
    <Progress percent={progressPercent} indicating />
    <center><h3>{progressMessage}</h3></center>
</Segment></Container></>
}

export default MyOrder;