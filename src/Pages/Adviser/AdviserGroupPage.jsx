import vector from '../../Assets/Vector.png';  
import AdviserNavbar from '../../Components/Navbar/AdviserNavbar';
import { useLocation } from 'react-router-dom';

export default function AdviserGroupPage() {

    const location = useLocation();
    const group = location.state;

    return ( 
        <div
            className="m-0 vh-100"
            style={{
                backgroundImage: `url(${vector})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundColor: '#b9ff66',
                height: '95vh'
            }}
        >
            <AdviserNavbar /> 

            <div 
                className="container d-flex align-items-center justify-content-center"> 
                <div 
                    className="shadow-lg"
                    style={{ 
                        background: 'rgba(255, 255, 255, 0.95)', 
                        color: '#333', 
                        maxWidth: '2000px', 
                        width: '2500px', 
                        overflow: 'hidden',
                        height: '82vh', 
                        borderRadius: '20px 20px 0 0',  
                    }}
                >  
                    <div 
                        style={{
                            fontWeight: 'bold',
                            backgroundColor: '#6ab04c', 
                            height: '50px',
                            fontSize: '22px', 
                            padding: '0 20px', 
                            borderBottom: '1px solid #ddd', 
                            color: '#fff',
                            display: 'flex',             
                            alignItems: 'center'
                        }}
                    >
                        {group.groupName}
                    </div>
  
                    <div 
                        style={{ 
                            padding: '20px', 
                            maxHeight: '500px',
                            overflowY: 'auto' 
                        }}
                    >
                        {/* Add your group content here */}
                    </div>
                </div> 
            </div>  
        </div>
    );
}