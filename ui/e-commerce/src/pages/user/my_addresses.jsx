import {useEffect, useState} from "react";
import {Button, Form, Input, TextArea, Select, Card} from "semantic-ui-react";

function MyAddresses() {
    const [isClicked, setIsClicked] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [neighbourhood, setNeighbourhood] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [fullAddress, setFullAddress] = useState("");


    const [allAddresses, setAllAddresses] = useState([]);

    const handleFirstname = (value) => {
        setFirstName(value.target.value);
    }
    const handleLastname = (value) => {
        setLastName(value.target.value);
    }
    const handlePhone = (value) => {
        setPhone(value.target.value);
    }
    const handleCity = (value) => {
        setCity(value.target.value);
    }
    const handleDistrict = (value) => {
        setDistrict(value.target.value);
    }
    const handleNeighbourhood = (value) => {
        setNeighbourhood(value.target.value);
    }
    const handlePostalCode = (value) => {
        setPostalCode(value.target.value);
    }
    const handleFullAddress = (value) => {
        setFullAddress(value.target.value);
    }

    const clickAddNewAddress = async () => {
        const myAddAddressData = {
            firstname: firstName,
            lastname: lastName,
            city: city,
            district: district,
            neighbourhood: neighbourhood,
            fullAddress: fullAddress,
            postalCode: postalCode,
            phoneNumber: phone,
        }

        const url = `http://localhost:8080/address/addAddress/${localStorage.getItem("currentUser")}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("tokenKey")
                },
                body: JSON.stringify(myAddAddressData),
            });

            if (response.ok) {
                console.log('İstek başarıyla tamamlandı');
                console.log(response.statusText);
            } else {
                console.log(response.statusText);
                throw new Error('İstek başarısız oldu');
            }
        } catch (error) {
            console.error('İstek hatası:', error);
        }
    }

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

    }, [clickAddNewAddress]);
    const addNewAddress = () => (
        <>{!isClicked?<Button color='grey' onClick={event => setIsClicked(true)} style={{width: "100%"}}>ADD A NEW ADDRESS</Button>:

            <><Form >
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
                        onChange={handleLastname}
                    />
                    <Form.Input
                        placeholder='Phone'
                        name='phone'
                        value={phone}
                        onChange={handlePhone}
                    />

                </Form.Group>
                <Form.Group widths={"equal"}>
                    <Form.Input
                        placeholder='City'
                        name='city'
                        value={city}
                        onChange={handleCity}
                    />
                    <Form.Input
                        placeholder='District'
                        name='district'
                        value={district}
                        onChange={handleDistrict}
                    />
                    <Form.Input
                        placeholder='Neighbourhood'
                        name='neighbourhood'
                        value={neighbourhood}
                        onChange={handleNeighbourhood}
                    />
                    <Form.Input
                        placeholder='Postal Code'
                        name='postal_code'
                        value={postalCode}
                        onChange={handlePostalCode}
                    />
                </Form.Group>
                <Form.Group >
                   <div style={{width:"100%"}}> <Form.TextArea
                        placeholder='Full Address'
                        name='full_address'
                        value={fullAddress}
                        onChange={handleFullAddress}
                    /></div>
                </Form.Group>
                <center><Button onClick={event => {
                    clickAddNewAddress()
                    setIsClicked(false)

                }
                } color='grey'>ADD NEW ADDRESS</Button></center>
            </Form></>

        }</>
    )
    const allAdresses = (item) => (<>
        <Card.Group>
            <Card style={{width:"100%"}}>
                <Card.Content>
                    <Card.Header>{`${item.city} adress`}</Card.Header>
                    <Card.Meta> {`${item.firstname} - ${item.lastname} - ${item.phoneNumber}`}</Card.Meta>
                    <Card.Description>
                        {`${item.fullAddress} ${item.postalCode} ${item.neighbourhood} ${item.district} ${item.city}`}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color='green'>
                            Update
                        </Button>
                        <Button basic color='red'>
                            Delete
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        </Card.Group>
    </>)
    return (<>
        {addNewAddress()}
        <>{allAddresses.map(value =>
            allAdresses(value)
        )}</>

    </>);
}

export default MyAddresses;