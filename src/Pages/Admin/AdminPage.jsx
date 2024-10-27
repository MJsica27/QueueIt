 import 'bootstrap/dist/css/bootstrap.min.css'; 
import AdminNavbar from '../../Components/Navbar/AdminNavbar';
import vector from '../../Assets/Vector.png';
import TextField from '@mui/material/TextField'; 


export default function AdminPage() { 
   

  return (
    <div className="m-0 vh-100" 
      style={{ 
      background: '#ffffff', 
      color: '#333333',
      backgroundImage: `url(${vector})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
        }}>
    <AdminNavbar />
    <div className="mx-5" style={{ background: 'rgba(238, 238, 238, 0.9)', color: '#333333', height: '100vh', borderRadius: '20px', padding: '35px'}}> 
     
      <div className='mb-10  d-flex align-items-center justify-content-between'>
        <h2>Classrooms</h2> 
      </div>
      <div className='m-0  d-flex align-items-center justify-content-between' style={{width: 'auto', marginTop: '100px'}}>
        <TextField id="outlined-search" label="Search Classcode" type="search" /> 
        <TextField id="outlined-search" label="Search Classroom" type="search" /> 
        <TextField id="outlined-search" label="Search Adviser" type="search" /> 
        <div style={{width: '300px'}}></div>
        </div>
    </div>
  </div>
  )
} 
