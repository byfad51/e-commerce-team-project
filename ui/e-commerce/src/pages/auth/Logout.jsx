import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react'

function Logout() {
  const navigate = useNavigate();
  localStorage.clear()
  localStorage.setItem("authorized",false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, 750);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (

      <div>
        <center>   <Button basic loading>
          Loading
        </Button><br/>  <label htmlFor="">{"Wait or click to go to home- "}</label> <br/><a href={"./"}>{"Home"}</a>
        </center> </div>
  );
}

export default Logout;
