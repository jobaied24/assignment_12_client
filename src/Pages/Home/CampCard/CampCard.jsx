import React from 'react';
import {Link} from 'react-router'
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaUserMd } from "react-icons/fa";

const CampCard = ({camp}) => {
 
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
<div className="card bg-base-100 transition-transform duration-400 shadow-xl hover:shadow-2xl">
  <figure>
    <img
  className="w-full h-[250px] object-cover transition-transform duration-500 hover:scale-105"
      src={camp.image}
      alt="Shoes" />
  </figure>

  <div className="card-body mt-6">
    <h2 className=" text-xl font-bold text-gray-800 line-clamp-2">{camp.campName}    </h2>

<div className="flex justify-between items-center">

<p className="flex items-center gap-2 font-medium text-gray-700">
  <FaUserMd className="text-primary" />
  Dr. {camp.healthcareProfessional}
</p>
  <div className="badge bg-[#34ebae] text-white font-semibold">
    ৳ {camp.campFees}
  </div>
</div>

<div className="space-y-1 mt-2 text-sm text-gray-600">
  <p className="flex items-center gap-3">
    <FaMapMarkerAlt className='text-primary' />
    {camp.location}
  </p>

  <p className="flex items-center gap-3">
    <FaCalendarAlt className='text-primary' />
    {formattedDate}
  </p>

  <p className="flex items-center gap-3">
    <FaUsers className='text-primary' />
    {camp.participantCount} Participants
  </p>
</div>

    <div className="card-actions mt-4 justify-end">
      <Link to={`/camp-details/${camp._id}`} className="btn bg-primary w-full text-white">View Details</Link>
    </div>
  </div>
</div>
    );
};

export default CampCard;