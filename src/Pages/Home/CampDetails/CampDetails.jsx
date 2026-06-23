import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserMd,
  FaUsers,
  FaMoneyBillWave,
   FaArrowRight 
} from "react-icons/fa";


const CampDetails = () => {
    const {campId} = useParams();
    const axiosSecure = useAxiosSecure();

    const {data:camp=[]}=useQuery({
        queryKey:['camp',campId],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/camps/${campId}`);
            return res.data;
        }
    });

    console.log(camp);

      const date = new Date(camp.dateTime);

const formattedDate = date.toLocaleString('en-US', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true
});

    return (
<div className="max-w-7xl mx-auto px-4 py-4">
      {/* Statistics Cards */}
<div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-6">

{/* participantCount */}
  <div className="card bg-[#EFF6FF] shadow-md hover:shadow-lg  hover:bg-blue-100 transition-all duration-200"> 
    <div className="card-body items-center">
      <FaUsers size={30} className="text-primary" />
      <p className='text-gray-600'>Participants</p>
      <h2 className="font-bold text-gray-700 text-lg">{camp.participantCount}</h2>
    </div>
  </div>

  {/* Camp Fees */}
  <div className="card bg-[#EFF6FF] shadow-md hover:shadow-lg  hover:bg-blue-100 transition-all duration-200">
    <div className="card-body items-center">
      <FaMoneyBillWave size={30} className="text-primary" />
      <p className='text-gray-600'>Camp Fee</p>
      <h2 className="font-bold text-gray-700 text-lg">৳{camp.campFees}</h2>
    </div>
  </div>
  
{/* healthcareProfessional */}
  <div className="card bg-[#EFF6FF] shadow-md hover:shadow-lg  hover:bg-blue-100 transition-all duration-200">
    <div className="card-body items-center">
      <FaUserMd size={30} className="text-primary" />
      <p className='text-gray-600'>Doctor</p>
      <h2 className="font-bold text-gray-700 text-lg">{camp.healthcareProfessional}</h2>
    </div>
  </div>

{/* Date & Time */}
  <div className="card bg-[#EFF6FF] shadow-md hover:shadow-lg  hover:bg-blue-100 transition-all duration-200">
    <div className="card-body items-center">
      <FaCalendarAlt size={30} className="text-primary" />
      <p className='text-gray-600'>Duration</p>
      <h2 className="font-bold text-gray-700">{formattedDate}</h2>
    </div>
  </div>

  <div className="card bg-[#EFF6FF] shadow-md hover:shadow-lg  hover:bg-blue-100 transition-all duration-200">
    <div className="card-body items-center">
      <FaMapMarkerAlt size={30} className="text-primary" />
      <p className='text-gray-600'>Location</p>
      <h2 className="font-bold text-gray-700">{camp.location}</h2>
    </div>
  </div>

</div>

  {/* description and image Section */}
<div className="grid md:grid-cols-2 gap-8 items-stretch">
  {/* Image */}
  <img
    src={camp.image}
    alt={camp.campName}
    className="w-full h-[400px] shadow-md rounded-xl object-cover"
  />

  {/* Details */}
  {/* <div className="space-y-5">

    <h1 className="text-4xl font-bold">
      {camp.campName}
    </h1>

    <div className="space-y-4">

      <p className="flex items-center gap-3">
        <FaCalendarAlt className="text-primary" />
        {camp.dateTime}
      </p>

      <p className="flex items-center gap-3">
        <FaMapMarkerAlt className="text-primary" />
        {camp.location}
      </p>

      <p className="flex items-center gap-3">
        <FaUserMd className="text-primary" />
        {camp.healthcareProfessional}
      </p>

      <p className="flex items-center gap-3">
        <FaMoneyBillWave className="text-primary" />
        ৳ {camp.campFees}
      </p>

      <p className="flex items-center gap-3">
        <FaUsers className="text-primary" />
        {camp.participantCount} Participants
      </p>

    </div>

  </div> */}

  
  {/* Description */}
  <div className=" card shadow-md h-full bg-[#EFF6FF]">
    <div className='card-body p-10'>

    <h2 className="text-3xl text-primary font-bold mb-4">
      About This Camp
    </h2>

    <p className="text-gray-600 leading-8">
      {camp.description}
    </p>
    </div>
  </div>
</div>



{/* join camp button */}
<div className="my-10 flex justify-between items-center bg-[#EFF6FF] rounded-2xl px-16 py-10 shadow-md">

  <div>

    <h2 className="text-3xl text-primary font-bold mb-4">
      Ready to Join This Medical Camp?
    </h2>

    <p className="max-w-2xl mx-auto text-gray-600 mb-6">
      Participate in this healthcare initiative and get access to
      professional medical consultations, screenings, and health
      awareness services.
    </p>

  </div>

      <button className="btn btn-primary btn-lg px-10 mr-10">
      Join Camp
      <FaArrowRight className='ml-1 text-xl' />
    </button>

</div>

</div>
    );
};

export default CampDetails;