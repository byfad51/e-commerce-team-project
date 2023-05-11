import { useNavigate } from 'react-router-dom';
import { Container} from 'react-bootstrap';
import Navbar from "../components/Navbar";
import {useState} from "react";
import '../design/message/popup.css';
import {Button, Icon, Message} from "semantic-ui-react";
import Popup from "../components/pop_message";

function Home() {
    const navigate = useNavigate();
    console.log(localStorage.getItem("authorized"))
    console.log(localStorage.getItem("role"))



    /*const Popup = ({ message, onClose, icon, buttonColor,errorMessageTitle, errorMessage }) => {
        return (
            <div className="popup">
                <div className="popup-content">
                    <><Message icon>
                        <Icon name={icon} loading />
                        <Message.Content>
                            <Message.Header>{errorMessageTitle}</Message.Header>
                            {errorMessage}
                        </Message.Content>
                    </Message></>
                    <Button onClick={onClose} basic color={buttonColor}>
                        Kapat
                    </Button>

                </div>
            </div>
        );
    };*/



    return(
        <Container>
            <Navbar />

        </Container>


    );
}

export default Home;