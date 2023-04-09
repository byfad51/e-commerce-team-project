import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import './Mya.css'


const Mya = () => {
    const [menuItems] = useState([
        { title: 'Add Product', path: '/#' },
        { title: 'List of all perfumes', path: '/#' },
        { title: 'List of all users', path: '/#' },
        { title: 'List of all orders', path: '/#' },
    ]);


    useEffect(() => {
        // State yönetimi
    }, []);
    const username = localStorage.getItem("username");
    const authorized = localStorage.getItem("authorized");
    return (
        <div className="sidebar">
            <h3><FiUser className="outlined-user-icon" />{authorized ? "Hi, non role": "Welcome sir, "+username} </h3>
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <Link to={item.path}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Mya;
