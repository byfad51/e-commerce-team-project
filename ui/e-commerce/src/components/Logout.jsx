import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  localStorage.clear()
  localStorage.setItem("authorized",false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
  
   <div>
    <label htmlFor="">{" You logged out and are going to home in 2 seconds. If it it not working, click to go home- "}</label> <a href={"./"}>{"Home"}</a>
 </div>
  );
}

export default Logout;
