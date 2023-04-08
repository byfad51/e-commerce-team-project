import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap';
import {   Grid, Segment } from 'semantic-ui-react'
import {useNavigate} from "react-router-dom";


function PasswordForgot () {
    document.title = 'Password Forgot';
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [answer, setAnswer] = useState("")
    const [password, setPassword] = useState("")
      let [isThereEmail, setisThereEmail] = useState("")

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
           alert("Enter an email")
        }else{
          //  setisThereEmail(true)
          const requestBody = {
            email:email,
          };
          console.log(requestBody);

          fetch("http://localhost:8080/passreset/getUserByEmail?email=" + email, {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify({
    email: email
  }),
}).then((res) => {
   setisThereEmail(true)
   console.log(res);
   return res.json(); // use json() method to parse the response
})
.then((data) =>{
  console.log(data)
})
.catch((err) => {
  alert("ERROR - TRY AGAIN -" + err.message)
  console.log(err)
});

         /* .then((data) => {
            const result = JSON.parse(data);
            localStorage.setItem("tokenKey", result.message);
            localStorage.setItem("currentUser", result.userId);
            localStorage.setItem("userName", username);

          })
          .catch((err) => {
              alert("ERROR - TRY AGAIN -" + err.message)
              console.log(err)
          });*/
        }
    }


   // const navigate = useNavigate();
    return (<Segment>
        <Grid columns={3} relaxed='very' stackable>
            <Grid.Column> </Grid.Column>
            <Grid.Column>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"  placeholder="name@example.com" onChange={(event) => handleEmail(event.target.value)} />
                    </Form.Group>
                    <Button variant="dark" onClick={handleCheck}>CHECK</Button><br/>
                </Form>
                
                {isThereEmail ?  <Form.Label>Doğru</Form.Label>:  <Form.Label>Yanlış</Form.Label>}
            </Grid.Column>
            <Grid.Column> </Grid.Column><Grid.Column> </Grid.Column>
            <Grid.Column verticalAlign='middle'>
                <center>                    <Form.Text className="text-muted mb-3"> <Button variant="link" style={{color:"cadetblue"}} onClick={handleLogin}>You know the password?</Button></Form.Text>
<br/>
                    <Form.Text className="text-muted mb-3"> <Button variant="outline-danger" style={{color:"darkred"}} onClick={handleRegister}>Register for Free</Button></Form.Text>
                </center>   </Grid.Column> <Grid.Column> </Grid.Column><Grid.Column> </Grid.Column>
        </Grid>


    </Segment>);

}

function WhenClick () {
    return ( <Form.Text className="text-muted mb-3"> <Button variant="outline-danger" style={{color:"darkred"}} >Register for Free</Button></Form.Text>
    );
}

export default PasswordForgot
