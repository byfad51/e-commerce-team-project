import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Logout from "./pages/auth/Logout";
import PasswordForgot from "./pages/auth/PasswordForgot";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/product/ProductList";
import ProductDetails from "./pages/product/ProductDetails";
import ShoppingCard from "./pages/ShoppingCard";
import MyFavorites from "./pages/user/my_favorites";
import UserProfile from "./pages/user/user_main_profile";
function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorites" element={<MyFavorites />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<ShoppingCard />} />
          <Route path="/cart" element={<ShoppingCard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/detail" element={<ProductDetails />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/passwordforgot" element={<PasswordForgot />} />
        <Route  path="/register" element={<Register />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;