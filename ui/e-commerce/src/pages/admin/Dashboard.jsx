import React, {useEffect} from 'react'
import Navbar from '../../components/Navbar'
import MyAccount from './MyAccount'
import { useNavigate } from "react-router-dom";
import { Container,Segment } from 'semantic-ui-react'
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
      <Container>


          <Navbar />

              <div style={{ display: 'flex' }}>
                  <MyAccount />
              </div>

      </Container>
  )

}

export default Dashboard;