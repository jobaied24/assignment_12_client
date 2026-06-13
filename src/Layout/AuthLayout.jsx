import Lottie from 'lottie-react';
import React from 'react';
import { Outlet } from 'react-router';
// import loginAnimation from '../assets/Doctor Prescription.json'
import registerAnimation from '../assets/Register.json'

const AuthLayout = () => {

    return (
<div className="hero bg-base-200 min-h-screen">
       
       <Outlet></Outlet>
       
    </div>

    );
};

export default AuthLayout;