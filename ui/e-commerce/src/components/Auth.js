import React, {useState} from "react";
import {FormControl, InputLabel, Input, Button, FormHelperText} from "@mui/material"
import { useNavigate } from "react-router-dom";


function Auth () {

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
        sendRequest("login")
        
    }

    return(
        <div>
        <FormControl>
            <InputLabel>firstname</InputLabel>
            <Input onChange={(event) => handleFirstname(event.target.value)} />
            <InputLabel style = {{top: 80}}>lastname</InputLabel>
            <Input style={{ top: 40 }} onChange={(event) => handleLastname(event.target.value)} />
            <InputLabel style = {{top: 160}}>Username</InputLabel>
            <Input style={{ top: 80 }} onChange={(event) => handleUsername(event.target.value)} />
            <InputLabel style = {{top: 240}}>Password</InputLabel>
            <Input style={{ top: 120 }} onChange={(event) => handlePassword(event.target.value)} />
            <InputLabel style = {{top: 320}}>E-mail</InputLabel>
            <Input style={{ top: 160 }} onChange={(event) => handleEmail(event.target.value)} />
            <Button variant = "containent" style ={{marginTop: 200}} onClick={handleRegister} > Register </Button>
            <FormHelperText >Are you already registered? </FormHelperText>
            <Button variant = "containent" style ={{marginTop: 30}} onClick={handleLogin} > Login </Button>
            
        </FormControl>
        </div>
    )
}

export default Auth;