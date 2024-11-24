import React, { useContext } from 'react';
import { UserContext } from '../Components/User/UserContext';
import StudentPage from './Student/StudentPage';
import AdviserPage from './Adviser/AdviserPage';
import AdminPage from './Admin/AdminPage';
import LoginForm from '../Auth/LoginForm';

const HomePage = () => {
    const user = useContext(UserContext).user
    return (
        <>
            {user?
                user.role == "STUDENT"?
                <StudentPage/>:user.role === "ADVISER"?
                                <AdviserPage/>:<AdminPage/>:<LoginForm/>
            }
        </>
    );
}

export default HomePage;
