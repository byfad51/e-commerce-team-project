import { useNavigate } from 'react-router-dom';
import {Carousel, Button, Container} from 'react-bootstrap';
import Navbar from "./Navbar";
import MyAccount from './MyAccount';

function Home() {
  const navigate = useNavigate();


  return(
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
       <MyAccount/>
      </div>
    </div>
    
  );
  }
  
  export default Home;