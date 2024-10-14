import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import vector from '../Assets/Vector.png';

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching user data from an API
    const fetchUserData = async () => {
      const response = await fetch('/api/user'); // Replace with your API endpoint
      const data = await response.json();
      setUser(data);
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Loading state while fetching data
  }

  return (
    <div className="m-0 vh-100" 
       style={{ 
        background: '#B9FF66', 
        color: '#333333',
        backgroundImage: `url(${vector})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
         }}> 

         <h1>Profile Page</h1>
         
         <div className="container mt-5">
           <div className="row">
             <div className="col-md-4">
               <img 
                 src={user.profilePicture} 
                 alt={`${user.name}'s profile`} 
                 className="img-fluid rounded-circle"
                 style={{ width: '150px', height: '150px' }}
               />
             </div>
             <div className="col-md-8">
               <h2>{user.name}</h2>
               <p>Email: {user.email}</p>
             </div>
           </div>
         </div>
         
    </div>
  )
}
