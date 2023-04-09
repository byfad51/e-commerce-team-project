import React, {useState} from "react";
//import {FormControl, InputLabel, Input, Button, FormHelperText} from "@mui/material"
import { useNavigate } from "react-router-dom";
import { Form, Button} from 'react-bootstrap';
import {   Grid, Segment } from 'semantic-ui-react'


function Register () {
    document.title = 'Register';
    const navigate = useNavigate();

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleFirstname = (value) => {setFirstname(value) }
    const handleLastname = (value) => {setLastname(value)}
    const handleUsername = (value) => {setUsername(value) }
    const handlePassword = (value) => {setPassword(value)}
    const handleEmail = (value) => {setEmail(value) }
    const handlePhone = (value) => {setPhone(value) }
    const handleAddress = (value) => {setAddress(value)} 
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
            address: address,
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
            address: address,
            question: question,
            answer: answer
          }),
        })
        
        .then((res) => {
            if (!res.ok) {

              throw new Error("Error " + res.status + ": " + res.statusText);
            }
            console.log(res);

            return res.text();
          })
          .then((data) => {
            const result = JSON.parse(data);
            localStorage.setItem("tokenKey", result.message);
            localStorage.setItem("currentUser", result.userId);
            localStorage.setItem("username", username);
              alert("Registired")
              navigate("/login")
          })
          .catch((err) =>{
              console.log(err)
              alert(err)
          } );

      };      

    const handleRegister = () => {
        sendRequest("register")
    }
    const handleLogin = () => {
        navigate("/login")
    }

    return(
        <Segment>
            <Grid columns={3} relaxed='very' stackable>
                <Grid.Column> </Grid.Column>
                <Grid.Column>
      <Form>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your first name" onChange={(event) => handleFirstname(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your last name" onChange={(event) => handleLastname(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter your username" onChange={(event) => handleUsername(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"  onChange={(event) => handlePassword(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" onChange={(event) => handleEmail(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="number" placeholder="Ex: 05559990011" onChange={(event) => handlePhone(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Address" onChange={(event) => handleAddress(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
      <Form.Label>Question</Form.Label>
      <Form.Select onChange={(event) => handleQuestion(event.target.value)}>
        <option value="">Choose a question...</option>
        <option value="What's you favourite color?">What's you favourite color?</option>
        <option value="What was your best teacher's name at high school?">What was your best teacher's name at high school?</option>
        <option value="What's the meaning of live?">What's the meaning of live?</option>
      </Form.Select>
    </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Answer</Form.Label>
        <Form.Control type="text" placeholder="Answer" onChange={(event) => handleAnswer(event.target.value)} />
      </Form.Group>
      <Button variant="dark" onClick={handleRegister}>Register</Button>
      <Form.Text className="text-muted mb-3">

          <br/>
         <center> <Button variant="outline-danger" style={{color:"darkred"}}  onClick={handleLogin}>Already registered?</Button></center>
      </Form.Text>
    </Form>
                </Grid.Column>
                <Grid.Column>   </Grid.Column>
            </Grid>


        </Segment>
    )
}

export default Register;