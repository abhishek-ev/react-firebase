import React from 'react'
import { Outlet } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import Sidebar from './Sidebase'
import { useNavigate } from 'react-router-dom';


function Dashbord() {
    const navigate = useNavigate();
    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/login");
        });
    };

    return (
        <div className='d-flex flex-column'>
            <nav className='navbar navbar-expand-sm border-bottom pe-3'>
                <div className='container-fluid d-flex justify-content-between'>
                    <img src="/falooda-nation-logo.png" className='img-fluid' alt="logo" style={{ height: "3rem" }} />
                    <FontAwesomeIcon icon={faSignOut} onClick={handleLogout} fontSize={18} />
                </div>
            </nav>
            <div className='d-flex background-container  flex-fill'>
                <Sidebar />
                <div className='w-100 overflow-auto' style={{ height: "calc(100vh - 64px)" }}>
                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default Dashbord
