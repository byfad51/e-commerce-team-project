import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap';
import {Grid, Message, Segment} from 'semantic-ui-react'
import {useNavigate} from "react-router-dom";


function PasswordForgot () {
    document.title = 'Password Forgot';
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [password, setPassword] = useState("")
    const [isThereEmail, setisThereEmail] = useState("") //??

    const [message, setmessage] = useState("");
    const [messageColor, setMessageColor] = useState("red");
    const handleEmail = (value) => {
        setEmail(value)
    }
    const handleRegister = () => {

        navigate("/register")
        // history.go("/auth")
    }
    const handleLogin = () => {

        navigate("/login")
        // history.go("/auth")
    }
    const handleCheck = () => {

        if(email === ""){
           setmessage("Enter an email")
        }else{
          //  setisThereEmail(true)
         /* const requestBody = {
            email:email,
          };*/
        //  console.log(requestBody);

          fetch("http://localhost:8080/passreset/getUserByEmail", {
            method: 'POST',
            body: JSON.stringify({ email: email }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            if (!response.ok) {
            //  alert("error")
               // console.log(response.status)
              //  console.log(response.statusMessage)
              //  console.log(response.statusText)
                response.text().then(value => setmessage(value))

                throw new Error(response.status + " " + message);
            }
              setmessage("")
            setisThereEmail(true)
            return response.json();
          })
          .then(data => {
            //console.log(data)
            setQuestion(data.question)
            //setAnswer(data.question) //burada ne yapmışım bir fikrim, hata verirse burayı açın bi



          })
          .catch(error => {
           // alert("error")
            setisThereEmail(false)
             console.log(error.message);

          });

        }
    }
    const handleSend = () => {
        if(answer === "" || password===""){
            setmessage("Enter an answer and your new password. Probably you signed answer when you register.");
        } else {
          /*  const requestBody = {
                email:email,
                answer:answer,
                password:password,
            };*/
           // console.log(requestBody);
            const url = "http://localhost:8080/passreset/changePasswordByAnswer"
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email:email,
                    answer:answer,
                    password:password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                       // console.log(response.status)
                      //  console.log(response.statusMessage)
                      //  console.log(response.statusText)
                        response.text().then(value => setmessage(value))
                        throw new Error(response.status +" "+ message);
                    } else {
                        alert("Password changed for "+ email + " you are navigated to login");
                        navigate("/login");
                    }
                })
                .catch(error => {
                   console.error( error.message);
                });
        }
    }


    // const navigate = useNavigate();
    return (<Segment><center><label><h1>Password Forgotten</h1></label></center>
        <Grid columns={3} relaxed='very' stackable>
            <Grid.Column> </Grid.Column>
            <Grid.Column>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"  placeholder="name@example.com" disabled={isThereEmail} onChange={(event) => handleEmail(event.target.value)} />
                    </Form.Group>
                    <Button variant="dark" disabled={isThereEmail} onClick={handleCheck}>CHECK</Button><br/>

                </Form>

                {isThereEmail ?
               <Form>  <br/>
                  <Form.Label>The tip for answer: {question}</Form.Label>
                  <Form.Group className="mb-3">
                        <Form.Label>Answer entered when register:</Form.Label>
                        <Form.Control type="text"  placeholder="" disabled={!isThereEmail} onChange={(event) => setAnswer(event.target.value)} /><br/>
                        <Form.Label>New password: - *will change when answer correct.</Form.Label>
                        <Form.Control type="password"  placeholder="" disabled={!isThereEmail} onChange={(event) => setPassword(event.target.value)} />

                    </Form.Group>
                    <Button variant="dark" disabled={!isThereEmail} onClick={handleSend}>SEND</Button><br/>



                </Form>:  <Form.Label>Enter an email registered before.</Form.Label>}
                {message !=="" ? <Message color={messageColor}>{message}</Message> : null}
            </Grid.Column>
            <Grid.Column> </Grid.Column><Grid.Column> </Grid.Column>
            <Grid.Column  verticalAlign='middle'>
                <center>                    <Form.Text className="text-muted mb-3"> <Button variant="link" style={{color:"cadetblue"}} onClick={handleLogin}>You know the password?</Button></Form.Text>
<br/>
                    <Form.Text className="text-muted mb-3"> <Button variant="outline-danger" style={{color:"darkred"}} onClick={handleRegister}>Register for Free</Button></Form.Text>
                </center>   </Grid.Column> <Grid.Column> </Grid.Column>
                <Grid.Column> </Grid.Column>
        </Grid>

    </Segment>);

}
/*
function WhenClick () {
    return ( <Form.Text className="text-muted mb-3"> <Button variant="outline-danger" style={{color:"darkred"}} >Register for Free</Button></Form.Text>
    );
}*/

export default PasswordForgot