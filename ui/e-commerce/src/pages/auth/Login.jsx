import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import {Grid, Message, Segment} from 'semantic-ui-react'
import "../../design/DesignLoginRegister.css"

function Login () {
    document.title = 'Login';
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [authorized, setAuthorized] = useState("")

    const [message, setmessage] = useState("");
    const [messageColor, setMessageColor] = useState("green");
    const handleUsername = (value) => {
        setUsername(value)
        if(username===""|| password===""){
            setmessage("Enter username and password.")
            setMessageColor("green")
        }else{
            setmessage("")
        }
    }
    const handlePassword = (value) => {
        setPassword(value)
        if(username===""|| password===""){
            setmessage("Enter username and password.")
            setMessageColor("green")
        }else{
            setmessage("")
        }
    }

console.log(localStorage.getItem("authorized"))
    useEffect(() => {

            const timeout = setTimeout(() => {
                if(localStorage.getItem("authorized")==="true") {
                    navigate('/');
                }
        }, 10);

        return () => clearTimeout(timeout);
    }, [navigate]);



    const sendRequest = async (path) => {
        const requestBody = {
            username: username,
            password: password,
        };
        console.log(requestBody);

        await fetch("http://localhost:8080/auth/" + path, {
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
                    //setAuthorized("true")
                    setAuthorized(true)

                 //   console.log(result.status);
                    localStorage.setItem("tokenKey", result.message);
                    localStorage.setItem("currentUser", result.userId);
                    localStorage.setItem("username", username);
                    localStorage.setItem("authorized", "true");
                    localStorage.setItem("role", result.role);

                    navigate("/")
                }

            })
            .catch((err) => {
               // console.error(err.title);

            });

    };

    const handleRegister = () => {
    navigate("/register")
    }
    const handleForgotPassword = () => {
        navigate("/passwordforgot")
    }
    const handleLogin = async () => {
        if(username===""|| password===""){
            setmessage("Enter username and password.")
            setMessageColor("green")
        }else{
            if(password.length <5){
                setmessage("The password needs to be longer.")
                setMessageColor("red")
            }else{
                await sendRequest("login")
            }

        }


        if (authorized === "true") {

            navigate("/")

        }

    }

    return(
        <div className="loginDesign">
        <Segment><center><label><h1 className='loginName'>LOGIN</h1></label></center><div>{authorized ? navigate("/"):null}</div>
            <Grid columns={3} relaxed='very' stackable>
                <Grid.Column> </Grid.Column>
                <Grid.Column>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="email"  placeholder="username" onChange={(event) => handleUsername(event.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="password" onChange={(event) => handlePassword(event.target.value)} />
                        </Form.Group>

                        <Button onClick={handleLogin} style={{backgroundColor: "darkslateblue", color: "white",  display: "block", float:"right",borderColor:"darkslateblue"}}>Login</Button>
                        <Form.Text className="text-muted mb-3"> <Button variant="link" style={{color:"cadetblue", float:"left",marginLeft: "-10px"}} onClick={handleForgotPassword}>Password Forgotten?</Button></Form.Text>
                        <br/>
                        {message !=="" ? <Message color={messageColor}>{message}</Message> : null}
                    </Form>


                </Grid.Column>
                <Grid.Column> </Grid.Column><Grid.Column> </Grid.Column>
                <Grid.Column verticalAlign='middle'>
                    <center> <Form.Text className="text-muted mb-3"> <Button  style={{backgroundColor: "white", color: "darkslateblue",borderColor:"darkslateblue"}} onClick={handleRegister}>Register for Free</Button></Form.Text>
                    </center>   </Grid.Column> <Grid.Column> </Grid.Column><Grid.Column> </Grid.Column>
            </Grid>


        </Segment>
        </div>
    )
}

export default Login;
