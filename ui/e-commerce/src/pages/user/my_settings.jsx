import {Grid, Message, Segment} from "semantic-ui-react";
import {Button, Col, Form, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function MySettings() {
    document.title = 'My Settings';
    const navigate = useNavigate();
    const [user, setUser] = useState([])
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordForCheck, setPasswordForCheck] = useState("")
    const [email, setEmail] = useState("")
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [phone, setPhone] = useState("");
    const [id, setId] = useState(-1);
    const [buttonBlockUsername, setButtonBlockUsername] = useState(false);
    const [buttonBlockEmail, setButtonBlockEmail] = useState(false);

    const [message, setmessage] = useState("");
    const [messageColor, setMessageColor] = useState("green");
    const handleFirstname = (value) => {setFirstname(value) }
    const handleLastname = (value) => {setLastname(value)}
    const handleUsername =  (value) => {setUsername(value) }
    const handlePassword = (value) => {setPassword(value)}
    const handleEmail = (value) => {setEmail(value) }
    const handlePhone = (value) => {setPhone(value) }
    const handleQuestion = (value) => {setQuestion(value)}
    const handleAnswer = (value) => {setAnswer(value)}
    const handleId = (value) => {setId(value)}
    const handlePasswordForCheck = (value) => {setPasswordForCheck(value)}



    const localUsername = localStorage.getItem("username");

    useEffect(() => {
        const getUserInfo = async () => {
            await fetch('http://localhost:8080/users/getUserByUsername?username=' + localUsername)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setUser(data)
                    handleFirstname(data.firstname)
                    handleLastname(data.lastname)
                    handleUsername(data.username)
                    handleEmail(data.email)
                    handlePhone(data.phone)
                    handleQuestion(data.question)
                    handleId(data.id)
                })
                .catch(error => console.error(error));
        }
        getUserInfo()

    }, []);

    const sendRequestToUpdate = async () => {
        const requestBody = {
            username: username,
            password: password,
            email: email,
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            question: question,
            answer: answer
        };
        console.log(requestBody);
console.log(id)
        await fetch("http://localhost:8080/users/updateUser/" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': localStorage.getItem("tokenKey")
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                question: question,
                answer: answer
            }),
        })
            .then(async (res) => {
                //  const result = res.json()

                if (!res.ok) {
                    setMessageColor("red")
                    res.text().then(value => setmessage(value))
                    console.log(res.status);
                    console.log(res.statusMessage);
                    throw new Error("Error " + res.status + ": " + res.statusText);
                } else {
                    setmessage("Successfully changed!")
                    localStorage.setItem("username", username)
                    setMessageColor("green")


                    await fetch("http://localhost:8080/auth/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                        },
                        body: JSON.stringify({
                            username: username,
                            password: password,

                        }),
                    })

                        .then(async (res) => {

                            const result = await res.json();

                            if (!res.ok) {
                                //console.log(res.status)
                                setmessage(result.message)
                                setMessageColor("red")
                                //console.log()
                                throw new Error(`${res.status}: ${res.statusText}`);
                            }

                            //console.log("hataaaa")
                            //     console.log("Error " + res.status + ": " + res.statusText)
                            if (res.ok) {


                                //   console.log(result.status);
                                localStorage.setItem("tokenKey", result.message);
                                localStorage.setItem("currentUser", result.userId);
                                localStorage.setItem("username", username);
                                localStorage.setItem("authorized", "true");
                                localStorage.setItem("role", result.role);


                            }

                        })
                        .catch((err) => {
                            // console.error(err.title);

                        });


                }

            })
            .catch((err) => {
                console.log(err.message);
            });

    };

    const handleUpdate = async () => {
        if (firstname === "" || lastname === "" || username === "" || passwordForCheck === "" || email === "" || question === "") {
            setmessage("Fill all blanks!")
            setMessageColor("red")
        } else {
            if (answer === "") {
                handleAnswer(user.answer)
            }
            if(password===""){
                handlePassword(passwordForCheck)
            }

            await fetch("http://localhost:8080/auth/login" , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    username: localStorage.getItem("username"),
                    password: passwordForCheck,

                }),
            })

                .then(async (res) => {

                    const result = await res.json();

                    if (!res.ok) {
                        //console.log(res.status)
                        setmessage(result.message)
                        setMessageColor("red")
                        //console.log()
                        throw new Error(`${res.status}: ${res.statusText}`);
                    }


                    if (res.ok) {
                        setmessage("Doğrulama Başarılı")
                        setMessageColor("green")
                        await sendRequestToUpdate();
                    }

                })
                .catch((err) => {
                    // console.error(err.title);

                });


        }

    }
    return (<Segment>
            <Form>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={firstname} placeholder="Enter your first name" onChange={(event) => handleFirstname(event.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={lastname} placeholder="Enter your last name" onChange={(event) => handleLastname(event.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Username </Form.Label>
                    <Form.Control type="text" value={username} placeholder="Enter your username" onChange={(event) => handleUsername(event.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>New Password <font color={"red"}>Don't enter if you dont want to change this.</font></Form.Label>
                    <Form.Control type="password"   onChange={(event) => handlePassword(event.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email (*) </Form.Label>
                    <Form.Control type="email" value={email}   placeholder="name@example.com" onChange={(event) => handleEmail(event.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="number" value={phone} placeholder="Ex: 05559990011" onChange={(event) => handlePhone(event.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Question (*)</Form.Label>
                    <Form.Select value={question} onChange={(event) => handleQuestion(event.target.value)}>
                        <option value="">Choose a question...</option>
                        <option value="What's you favourite color?">What's you favourite color?</option>
                        <option value="What was your best teacher's name at high school?">What was your best teacher's name at high school?</option>
                        <option value="What's the meaning of live?">What's the meaning of live?</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Answer <font color={"red"}>Don't enter if you dont want to change this.</font></Form.Label>
                    <Form.Control type="text" placeholder="Answer" onChange={(event) => handleAnswer(event.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password (*) <font color={"red"}>You need to enter your now password.</font></Form.Label>
                    <Form.Control type="password"   onChange={(event) => handlePasswordForCheck(event.target.value)} />
                </Form.Group>

                <Button disabled={buttonBlockUsername || buttonBlockEmail}onClick={handleUpdate} style={{backgroundColor: "darkslateblue", color: "white",  display: "block", margin: "0 auto",borderColor:"darkslateblue"}}>UPDATE</Button>
                <Form.Text className="text-muted mb-3">

                    <br/>

                </Form.Text>
                {message !=="" ? <Message color={messageColor}>{message}</Message> : null}

            </Form>
        </Segment>
    )

}
export default MySettings