import React, { useEffect} from 'react'; 
import logo from '../Assets/logo/logo.png';
import img from '../Assets/img/img1.png';
import img3 from '../Assets/img/img3.png';
import img4 from '../Assets/img/img4.png';
import { Button } from 'react-bootstrap';
import EastIcon from '@mui/icons-material/East';
import { useNavigate } from 'react-router-dom'; 

export default function LandingPage() { 
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            navigate('/'); 
        }
    }, [navigate]);
  return (
    <div className="flex h-screen relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:3rem_3rem]"></div> 

      <div className="absolute pointer-events-none"> 
        <img src={img3} alt="illustration3" style={{ height:'500px', marginTop: '350px', marginLeft: '-40px' }}/>
        <img src={img4} alt="illustration4" style={{ height:'100px', marginTop: '-750px', marginLeft: '650px' }}/>
      </div>

      {/* Logo at the top-left */}
      <div className="absolute top-7 left-12">
        <img src={logo} alt="logo" className="h-14" />
      </div>

      {/* Left Section */}
      <div className="flex flex-col justify-center items-start ml-16 mt-0 flex-1">
        <h1 className="text-6xl sm:text-4xl md:text-6xl lg:text-8xl font-bold">Organize Your Workflow</h1>
        <p className="text-xl sm:text-lg md:text-base lg:text-xl mt-3">Simplify project management with streamlined tools and resources.</p>
        <Button onClick={()=>{navigate('/login')}} style={{ marginTop: '5px',width: '100px', color: '#000', backgroundColor: '#CCFC57', border: '.5px solid black', borderRadius: '25px' }}>
          Login <EastIcon />
        </Button>

        
      </div>

      {/* Right Section (Image hidden on small screens) */}
      <div className="flex justify-end flex-1 mr-12 mt-0 hidden md:block">
        <img src={img} alt="illustration" className="h-[800px]" />
      </div>
    </div>
  );
}
