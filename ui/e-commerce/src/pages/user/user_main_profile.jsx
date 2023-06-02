import {Container, Icon, Label, Segment} from "semantic-ui-react";
import Navbar from "../../components/Navbar";

import React, {useEffect, useState} from "react";

import {FiUser} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import MyInformation from "./my_information";
import MyFavorites from "./my_favorites";
import MySettings from "./my_settings";
import MyOrders from "./my_orders";
import MyReviews from "./my_reviews";
function UserProfile() {
    const navigate = useNavigate();
    useEffect(() => {

        const timeout = setTimeout(() => {
            if(localStorage.getItem("authorized")!=="true") {
                navigate('/');
            }
        }, 10);

        return () => clearTimeout(timeout);
    }, [navigate]);
    const [activeOption, setActiveOption] = useState('myinformation');

    const handleOptionClick = (option) => {
        setActiveOption(option);
    };

    const renderOption = () => {
        switch (activeOption) {
            case 'myinformation':
                return <MyInformation />;
            case 'myfavorites':
                return <MyFavorites />;
            case 'mysettings':
                return <MySettings />;
            case 'myorders':
                return <MyOrders />;
            case 'myreviews':
                return <MyReviews />;
            default:
                return <MyInformation />;
        }
    };
    const username = localStorage.getItem("username");
    const authorized = localStorage.getItem("authorized");
///  margin-left: 150px;
    return (

        <Container style={{width:"75%"}}><Navbar/>
            <Segment>
        <div className="sidebar">
            <ul>
                <li >
                    <h3 >
                        <FiUser   className="outlined-user-icon" />{authorized!=="true" ? "Hi, non role": <a href ='#'>{username}</a>}
                    </h3> </li>
                <li><Label style={{width:"130px"}}>
                    <button onClick={() => handleOptionClick('myinformation')}>
                        Information
                    </button></Label>
                </li>
                <li><Label style={{width:"130px"}}>
                    <button onClick={() => handleOptionClick('myfavorites')}>
                        Favorites<Icon name={"heart"} color={"red"} size={"large"}/>
                    </button></Label>
                </li>
                <li><Label style={{width:"130px"}}>
                    <button onClick={() => handleOptionClick('mysettings')}>
                        Settings
                    </button></Label>
                </li>
                <li><Label style={{width:"130px"}}>
                    <button onClick={() => handleOptionClick('myorders')}>
                         Orders
                    </button></Label>
                </li>
                <li><Label style={{width:"130px"}}>
                    <button onClick={() => handleOptionClick('myreviews')}>
                        Reviews
                    </button></Label>
                </li>
            </ul>
            <div className="content">{renderOption()}</div>
        </div>
        </Segment></Container>
    );
}
export default UserProfile;