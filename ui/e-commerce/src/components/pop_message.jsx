import React from 'react';
import {Button, Icon, Message} from "semantic-ui-react";

function Popup(props) {


    return (
        <div className="popup">
            <div className="popup-content">
                <><Message icon>
                    <Icon name={props.icon} loading />
                    <Message.Content>
                        <Message.Header>{props.errorMessageTitle}</Message.Header>
                        {props.errorMessage}
                    </Message.Content>
                </Message></>
                <Button onClick={props.onClose1}
                        basic color={props.buttonColor1}>
                    {props.buttonText1}
                </Button>
                {props.buttonText2!=="" ?<Button onClick={props.onClose2}
                         basic color={props.buttonColor2}>
                    {props.buttonText2}
                </Button>:null}

            </div>
        </div>
    );
}

export default Popup;
