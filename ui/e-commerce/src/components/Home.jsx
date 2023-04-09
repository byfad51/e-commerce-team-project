import { useNavigate } from 'react-router-dom';
import {Carousel, Button, Container} from 'react-bootstrap';
import Navbar from "./Navbar";
import Mya from './Mya';

function Home() {
  const navigate = useNavigate();


  return(
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
       
      </div>
    </div>
    
  );
  }
  
  export default Home;