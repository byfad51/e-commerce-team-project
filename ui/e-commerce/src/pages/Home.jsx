import { useNavigate } from 'react-router-dom';
import { Container} from 'react-bootstrap';
import Navbar from "../components/Navbar";

function Home() {
    const navigate = useNavigate();
    console.log(localStorage.getItem("authorized"))
    console.log(localStorage.getItem("role"))
    return(
        <Container>
            <Navbar />
        </Container>

    );
}

export default Home;