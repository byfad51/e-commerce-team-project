import React, {useEffect, useState} from "react";
//import {FormControl, InputLabel, Input, Button, FormHelperText} from "@mui/material"
import { useNavigate } from "react-router-dom";
import { Form, Button} from 'react-bootstrap';
import {Grid, Message, Segment} from 'semantic-ui-react'
import { Container, Row, Col } from 'react-bootstrap';


function Register () {
    document.title = 'Register';
    const navigate = useNavigate();
    useEffect(() => {

        const timeout = setTimeout(() => {
            if(localStorage.getItem("authorized")==="true") {
                navigate('/');
            }
        }, 10);

        return () => clearTimeout(timeout);
    }, [navigate]);
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [phone, setPhone] = useState("");
    const [buttonBlockUsername, setButtonBlockUsername] = useState(false);
    const [buttonBlockEmail, setButtonBlockEmail] = useState(false);

    const [message, setmessage] = useState("");
    const [messageColor, setMessageColor] = useState("green");
    const handleFirstname = (value) => {setFirstname(value) }
    const handleLastname = (value) => {setLastname(value)}
    const isUserExists = async () => {
        await fetch('http://localhost:8080/users/getUserByUsername?username=' + username)
            .then(response => {
                setmessage(response.statusMessage)
                if (response.status===302) {
                    setmessage("Username exists.")
                    setMessageColor("red")
                    setButtonBlockUsername(true)
                }else{
                    setmessage("")
                    setButtonBlockUsername(false)
                  //  isEmailExists()
                    throw new Error(`${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error(error.message);
            });

    }
    const isEmailExists = async () => {
        await fetch('http://localhost:8080/users/getUserByEmail?email=' + email)
            .then(response => {
                setmessage(response.statusMessage)
                if (response.status===302) {
                    setmessage("Email exists.")
                    setMessageColor("red")
                    setButtonBlockEmail(true)
                    throw new Error(`${response.status}: ${response.statusText}`);
                }else{
                    setmessage("")
                    setButtonBlockEmail(false)

                 //   isUserExists()
                }

            })
            .catch(error => {
               console.error(error.message);
            })

    }
    const handleUsername =  (value) => {setUsername(value) }
    const handlePassword = (value) => {setPassword(value)}
    const handleEmail = (value) => {setEmail(value) }
    const handlePhone = (value) => {setPhone(value) }
    const handleQuestion = (value) => {setQuestion(value)}
    const handleAnswer = (value) => {setAnswer(value)}

    /*  if (localStorage.getItem("authorized")) { /// NŞA, giriş yapılmışsa ana sayfaya atar
       navigate('/')
   }*/

    const sendRequest = (path) => {
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

        fetch("http://localhost:8080/auth/" + path, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
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
            .then((res) => {
          //  const result = res.json()

            if (!res.ok) {
                if(res.status === 409){
                    setmessage("User exists")
                    setMessageColor("red")
                }else{
                    res.text().then(value => setmessage(value))

                }
                console.log(res.status);
                console.log(res.statusMessage);
                throw new Error("Error " + res.status + ": " + res.statusText);
            }else{
                setmessage("Registered. You are going to login.")
                setMessageColor("green")

                    const timeout = setTimeout(() => {
                        navigate('/login');
                    }, 2500);

                    return () => clearTimeout(timeout);

            }

          })
          .catch((err) =>{
              console.log(err.message);
          } );

      };      

    const handleRegister = () => {
        if(firstname===""||lastname===""||username===""||password===""||email===""||question===""||answer===""){
            setmessage("Fill all blanks!")
            setMessageColor("red")
        }else{
            sendRequest("register")
        }

    }
    const handleLogin = () => {
        navigate("/login")
    }

    return(
        <div >
        <Segment><center><label><h1 className="registerName">REGISTER</h1></label></center>
            <Grid columns={3} relaxed='very' stackable>
                <Grid.Column> </Grid.Column>
                <Grid.Column>
      <Form>
              <Row>
                  <Col>
                      <Form.Group className="mb-3">
                          <Form.Label>First Name (*)</Form.Label>
                          <Form.Control type="text" placeholder="Enter your first name" onChange={(event) => handleFirstname(event.target.value)} />
                      </Form.Group>
                  </Col>
                  <Col>
                      <Form.Group className="mb-3">
                          <Form.Label>Last Name (*)</Form.Label>
                          <Form.Control type="text" placeholder="Enter your last name" onChange={(event) => handleLastname(event.target.value)} />
                      </Form.Group>
                  </Col>
              </Row>

          <Form.Group className="mb-3">
        <Form.Label>Username (*) {buttonBlockUsername?<font color={"red"}>Username exists</font>:null}</Form.Label>
        <Form.Control type="text"  onBlur={()=>isUserExists()} placeholder="Enter your username" onChange={(event) => handleUsername(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password (*)</Form.Label>
        <Form.Control type="password"  onChange={(event) => handlePassword(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email (*) {buttonBlockEmail?<font color={"red"}>Email exists</font>:null}</Form.Label>
        <Form.Control type="email"  onBlur={()=>isEmailExists()} placeholder="name@example.com" onChange={(event) => handleEmail(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="number" placeholder="Ex: 05559990011" onChange={(event) => handlePhone(event.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
      <Form.Label>Question (*)</Form.Label>
      <Form.Select onChange={(event) => handleQuestion(event.target.value)}>
        <option value="">Choose a question...</option>
        <option value="What's you favourite color?">What's your favourite color?</option>
        <option value="What was your best teacher's name at high school?">What was your best teacher's name at high school?</option>
        <option value="What's the meaning of live?">What's the meaning of live?</option>
      </Form.Select>
    </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Answer (*)</Form.Label>
        <Form.Control type="text" placeholder="Answer" onChange={(event) => handleAnswer(event.target.value)} />
      </Form.Group>
      <Button disabled={buttonBlockUsername || buttonBlockEmail}onClick={handleRegister} style={{backgroundColor: "darkslateblue", color: "white",  display: "block", margin: "0 auto",borderColor:"darkslateblue"}}>Register</Button>
      <Form.Text className="text-muted mb-3">

          <br/>
         <center> <Button  onClick={handleLogin} style={{backgroundColor: "white", color: "darkslateblue",borderColor:"darkslateblue"}}>Already registered?</Button></center>
      </Form.Text>
          {message !=="" ? <Message color={messageColor}>{message}</Message> : null}

      </Form>
                </Grid.Column>
                <Grid.Column>   </Grid.Column>
            </Grid>


        </Segment>
        </div>
    )
}

export default Register;