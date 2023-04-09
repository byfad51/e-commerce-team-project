import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import ProductList from "./components/product/ProductList";
import PasswordForgot from "./components/PasswordForgot";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/passwordforgot" element={<PasswordForgot />} />
        <Route  path="/register" element={<Register />}>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;