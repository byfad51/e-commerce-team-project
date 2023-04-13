import { useNavigate } from 'react-router-dom';
import {Carousel, Button, Container} from 'react-bootstrap';
import Navbar from "./Navbar";

function Home() {
  const navigate = useNavigate();
  console.log(localStorage.getItem("authorized"))
console.log(localStorage.getItem("role"))
  return(
    <div>
      <Navbar />
    </div>
    
  );
  }
  
  export default Home;

