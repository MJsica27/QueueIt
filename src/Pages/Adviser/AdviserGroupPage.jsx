import AdviserNavbar from '../../Components/Navbar/AdviserNavbar';
import { useLocation } from 'react-router-dom'; 
import BackButton from '../../Components/Buttons/BackButton';
import { IconButton, } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function AdviserGroupPage() {

    const location = useLocation();
    const group = location.state;

    return ( 
        <div className="m-0 vh-100" style={{  backgroundPosition: 'center', backgroundSize: 'cover', backgroundColor: '#fff', height: '95vh' }} >
            <AdviserNavbar /> 

            <div  className=" d-flex align-items-center justify-content-center"> 
                <div  style={{ backgroundColor:'rgba(0,0,0,0.03)', borderRadius: '5px', color: '#333',  width: '1400px', overflow: 'hidden', height: '82vh', margin: '20px 0 0 20px',  }} >  
                    <div  style={{ fontWeight: 'bold',   height: '50px', fontSize: '22px', padding: '0 20px', color: '#000', display: 'flex', alignItems: 'center'}} >
                        <span>
                        <BackButton />
                                {group.groupName}
                            <IconButton  style={{ color: 'black'}}>
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
