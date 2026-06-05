import React from 'react';
import campcureLogo from '../../../assets/campcureLogo.png'

const CampCureLogo = () => {
    return (
        <div className='flex items-center gap-2'>
            <img src={campcureLogo} className='w-10' alt="" />
            <p className='text-2xl font-semibold text-primary'>Campcure</p>
        </div>
    );
};

export default CampCureLogo;