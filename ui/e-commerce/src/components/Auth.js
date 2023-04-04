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
        fetch("/auth/" + path, {
            method: "POST",
            headers: {
                "Content-Type": "application-json",
            },
            body : JSON.stringify({
                firstname: firstname,
                lastname : lastname,
                username : username,
                password : password,
                email: email 
            }),
        })
        .then((res) => res.JSON())
        .then((result) => {localStorage.setItem("tokenKey", result.message);
                         localStorage.setItem("currentUser", result.userId);
                         localStorage.setItem("userName", username)})
        .catch((err) => console.log(err))
    }

    const handleRegister = () => {
        sendRequest("register")
        setFirstname("")
        setLastname("")
        setUsername("")
        setPassword("")
        setEmail("")
       // history.go("/auth")
    }
    const handleLogin = () => {
        sendRequest("login")
        setFirstname("")
        setLastname("")
        setUsername("")
        setPassword("")
        setEmail("")
    }

    return(
        <div>
        <FormControl>
            <InputLabel>First-name</InputLabel>
            <Input onChange={(i) => handleFirstname(i.target.value)} />
            <InputLabel style = {{top: 80}}>Last-name</InputLabel>
            <Input style = {{top: 40}} onChange={(i) => handleLastname(i.target.value)}  />
            <InputLabel style = {{top: 160}}>Username</InputLabel>
            <Input style = {{top: 80}} onChange={(i) => handleUsername(i.target.value)} />
            <InputLabel style = {{top: 240}}>Password</InputLabel>
            <Input style = {{top: 120}} onChange={(i) => handlePassword(i.target.value)} />
            <InputLabel style = {{top: 320}}>E-mail</InputLabel>
            <Input style = {{top: 160}} onChange={(i) => handleEmail(i.target.value)} />
            <Button variant = "containent" style ={{marginTop: 200}} onClick={handleRegister} > Register </Button>
            <FormHelperText >Are you already registered? </FormHelperText>
            <Button variant = "containent" style ={{marginTop: 30}} onClick={handleLogin} > Login </Button>
            
        </FormControl>
        </div>
    )
}

export default Auth;