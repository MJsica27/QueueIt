import vector from '../../Assets/Vector.png';  
import AdviserNavbar from '../../Components/Navbar/AdviserNavbar';
import { useLocation } from 'react-router-dom';
import backIcon from '../../Assets/icons/arrow.png';
import { IconButton, } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function AdviserGroupPage() {

    const location = useLocation();
    const group = location.state;

    return ( 
        <div className="m-0 vh-100" style={{ backgroundImage: `url(${vector})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundColor: '#fff', height: '95vh' }} >
            <AdviserNavbar /> 

            <div  className="container d-flex align-items-center justify-content-center"> 
                <div className="shadow-lg"  style={{ background: 'rgba(255, 255, 255, 0.95)', color: '#333',  width: '2500px', overflow: 'hidden', height: '82vh', borderRadius: '20px 20px 0 0'}} >  
                    <div  style={{ fontWeight: 'bold', backgroundColor: '#abf500', height: '50px', fontSize: '22px', padding: '0 20px', color: '#fff', display: 'flex', alignItems: 'center'}} >
                        <span>
                            <img src={backIcon} alt="back"  style={{ width: '25px', height: '25px', marginRight: '10px' }} />
                                {group.groupName}
                            <IconButton  style={{ color: 'white'}}>
                                <MoreHorizIcon/>
                            </IconButton>
                        </span>
                        
                    </div>
  
                    <div  style={{ padding: '20px', maxHeight: '500px', overflowY: 'auto' }} > 
                    </div>
                </div> 
            </div>  
        </div>
    );
}
