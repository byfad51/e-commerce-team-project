import React, {useEffect} from 'react'
import Navbar from '../components/Navbar'
import MyAccount from '../components/MyAccount'
import { useNavigate } from "react-router-dom";

function Dashboard () {
    const navigate = useNavigate();
    useEffect(() => {

        const timeout = setTimeout(() => {
            if(localStorage.getItem("role")!=="ROLE_ADMIN") {
                navigate('/');
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [navigate]);
  return(
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <MyAccount />
      </div>
    </div>

  )

}

export default Dashboard;