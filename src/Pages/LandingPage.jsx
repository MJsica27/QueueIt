import React, { useEffect} from 'react'; 
import logo from '../Assets/logo/logo.png';
import img from '../Assets/img/img1.png';
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
    <div className="flex h-screen relative">
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div> 

      {/* Logo at the top-left */}
      <div className="absolute top-7 left-10">
        <img src={logo} alt="logo" className="h-14" />
      </div>

      {/* Left Section */}
      <div className="flex flex-col justify-center items-start ml-12 mt-0 flex-1">
        <h1 className="text-6xl sm:text-4xl md:text-6xl lg:text-8xl font-bold">Organize Your Workflow</h1>
        <p className="text-xl sm:text-lg md:text-base lg:text-xl">Simplify project management with streamlined tools and resources.</p>
        <Button onClick={()=>{navigate('/login')}} style={{ width: '100px', color: '#000', backgroundColor: '#CCFC57', border: '.5px solid black', borderRadius: '25px' }}>
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
