import React from 'react';
import { Login, Register } from './components/auth.js';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  return (
      <div className="App">
        <nav>
          <ul>
            <li>
            </li>
            <li>
         
            </li>
          </ul>
        </nav>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
          
      </Routes>
    </BrowserRouter>
      </div>
   
  );
};

export default App;