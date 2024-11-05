import vector from '../../Assets/Vector.png'  
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
        className="mx-5" 
        style={{ 
            background: 'rgba(238, 238, 238, 0.9)', 
            color: '#333333', 
            height: '570px', 
            borderRadius: '20px 20px 0 0',
            padding: '25px', 
            overflow: 'hidden', 
            position: 'relative' 
        }}
    > 
        <div 
            className="mx-5" 
            style={{ 
                background: 'rgba(238, 238, 238, 0.9)', 
                color: '#333333', 
                height: '570px', 
                width: 'auto', 
                border: '1px solid black',  
                overflowY: 'auto',  
                borderRadius: '20px 20px 0 0' 
            }}
        >
            <div 
                style={{
                    fontWeight: 'bold',   
                    backgroundColor: '#b9ff66', 
                    height: '45px',
                    width: '100%',   
                    fontSize: '20px', 
                    padding: '0px 15px', 
                    borderBottom: '1px solid black', 
                    borderRadius: '20px 20px 0 0',
                    display: 'flex',             
                    alignItems: 'center',   
                }}
            >
                {group.groupName}  
            </div>
  
        </div> 
    </div>  
</div>
  )
}
