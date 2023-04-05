import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap';



function Login () {

    const navigate = useNavigate();
    
   
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [authorized, setAuthorized] = useState("")
  
    const handleUsername = (value) => {
        setUsername(value)
    }
    const handlePassword = (value) => {
        setPassword(value)
    }


    const sendRequest = (path) => {
        const requestBody = {
            username: username,
            password: password,
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
        
          }),
        })
        
        .then((res) => {
            if (!res.ok) {
              throw new Error("Error " + res.status + ": " + res.statusText);
            }
            if (res.ok) {
              setAuthorized(true)
              navigate("/")
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
        
        navigate("/register")
       // history.go("/auth")
    }
    const handleLogin = () => {
        sendRequest("login")
        
        
    }

    return(
      <Container className="d-flex justify-content-center">
      <Form>
    
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" onChange={(event) => handleUsername(event.target.value)} />
      </Form.Group>
    
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" onChange={(event) => handlePassword(event.target.value)} />
      </Form.Group>
    
      <Button variant="dark" onClick={handleLogin}>Login</Button>
      <Form.Text className="text-muted mb-3">Already registered? <Button variant="link" onClick={handleRegister}>Register</Button></Form.Text>
    </Form>
    </Container>
    )
}

export default Login;