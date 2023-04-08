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

    const handleFirstname = (value) => {
        setFirstname(value)
    }
    const handleLastname = (value) => {
        setLastname(value)
    }
    const handleUsername = (value) => {
        setUsername(value)
    }
    const handlePassword = (value) => {
        setPassword(value)
    }
    const handleEmail = (value) => {
        setEmail(value)
    }

    const sendRequest = (path) => {
        const requestBody = {
            username: username,
            password: password,
            email: email,
            firstname: firstname,
            lastname: lastname,
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
            localStorage.setItem("userName", username);
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
        
       // history.go("/auth")
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
        <Form.Control type="text" placeholder="Ali" onChange={(event) => handleFirstname(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Zengin" onChange={(event) => handleLastname(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="ali123" onChange={(event) => handleUsername(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"  onChange={(event) => handlePassword(event.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" onChange={(event) => handleEmail(event.target.value)} />
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