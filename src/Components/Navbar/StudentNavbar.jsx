import { Container, Nav, Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  
import pu from '../../Assets/profile-user.png'
import lightwo from '../../Assets/logo/light(wo-outline).png';

export default function StudentNavbar() {
    const navigate = useNavigate();

    const handleProfile = () => {
        console.log("Navigating to profile...");  
        navigate('/profile');
    };
  return (
    <div>
        <Navbar expand="lg" className="mt-0" style={{ background: 'transparent' }}>
            <Container className="d-flex justify-content-between align-items-center">
                <Navbar.Brand href="home">
                    <img src={lightwo} alt="System Logo" style={{ width: '125px', height: '40px' }} />
                </Navbar.Brand>

                <Nav>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="profile-tooltip">User Profile</Tooltip>}>
                        <Nav.Link onClick={handleProfile}>
                            <img src={pu} alt="User Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                        </Nav.Link>
                    </OverlayTrigger>
                </Nav>
            </Container>
        </Navbar>
    </div>
  )
}
