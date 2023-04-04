import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Auth from "./components/Auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route  path="/auth" element={<Auth />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;