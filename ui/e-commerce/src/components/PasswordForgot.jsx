import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap';
import {   Grid, Segment } from 'semantic-ui-react'
import {useNavigate} from "react-router-dom";
import alert from "bootstrap/js/src/alert";
//import {useNavigate} from "react-router-dom";

function PasswordForgot () {
    document.title = 'Password Forgot';
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
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
       /* sendRequest("login")

        if(authorized === true){
            navigate("/")
        }*/

   
    }


   // const navigate = useNavigate();
    return (<Segment>
        <Grid columns={3} relaxed='very' stackable>
            <Grid.Column> </Grid.Column>
            <Grid.Column>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text"  placeholder="name@example.com" onChange={(event) => handleEmail(event.target.value)} />
                    </Form.Group>


                    <Button variant="dark" onClick={handleCheck}>CHECK</Button>
                    <br/>

                </Form>


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
