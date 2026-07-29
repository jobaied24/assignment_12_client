import React from 'react';
import campcureLogo from '../../../assets/campcureLogo.png'
import { NavLink } from 'react-router';

const CampCureLogo = () => {
    return (
        <NavLink to='/' className='flex items-center gap-2'>
            <img src={campcureLogo} className='w-10' alt="" />
            <p className='text-2xl font-semibold text-primary'>Campcure</p>
        </NavLink>
    );
};

export default CampCureLogo;