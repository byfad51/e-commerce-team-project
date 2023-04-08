import React, {useState} from "react";
//import {FormControl, InputLabel, Input, Button, FormHelperText} from "@mui/material"
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap';



function Register () {

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
          })
          .catch((err) => console.log(err));
      };      

    const handleRegister = () => {
        sendRequest("register")
        
       // history.go("/auth")
    }
    const handleLogin = () => {
        navigate("/login")
        
    }

    return(
      <Container className="d-flex justify-content-center">
      <Form>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" onChange={(event) => handleFirstname(event.target.value)} />
      </Form.Group>
    
      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" onChange={(event) => handleLastname(event.target.value)} />
      </Form.Group>
    
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" onChange={(event) => handleUsername(event.target.value)} />
      </Form.Group>
    
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" onChange={(event) => handlePassword(event.target.value)} />
      </Form.Group>
    
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" onChange={(event) => handleEmail(event.target.value)} />
      </Form.Group>
      
      <Button variant="primary" onClick={handleRegister}>Register</Button>
      <Form.Text className="text-muted mb-3">Already registered? <Button variant="link" onClick={handleLogin}>Login</Button></Form.Text>
    </Form>
    </Container>
    )
}

export default Register;