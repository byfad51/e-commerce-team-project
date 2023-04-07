import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Carousel, Button, Container} from 'react-bootstrap';
import Navbar from "./Navbar";

function Home() {
  const navigate = useNavigate();


  return(
  <Navbar />

    
  );
  }
  
  export default Home;