import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Logout from "./pages/auth/Logout";
import PasswordForgot from "./pages/auth/PasswordForgot";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/detail" element={<ProductDetails />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/passwordforgot" element={<PasswordForgot />} />
        <Route  path="/register" element={<Register />}>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;