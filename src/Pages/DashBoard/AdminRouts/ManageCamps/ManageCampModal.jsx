import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEdit } from 'react-icons/fa';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageCampModal = ({camp,refetch}) => {
    const {handleSubmit,register,reset} = useForm();
    const [imageURL,setImageURL] = useState(camp.image);
    const axiosSecure = useAxiosSecure();


    // update camp mutation
    const updateMutation = useMutation({
        mutationFn:async(updateData)=>{
         const result = await axiosSecure.put(`update-camp/${camp._id}`,updateData);
         return result.data;
        },
        
        onSuccess:()=>{
            
            refetch();

            Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Camp updated successfully!",
  showConfirmButton: false,
  timer: 1500
});

reset();

document.getElementById(`camp_modal_${camp._id}`).checked = false;

        },
        onError:(error)=>{
            Swal.fire({
  icon: "error",
  title: "Update failed",
  text: error.message,
});
        }
    })

    const onSubmit = async(data) =>{
        console.log(data);

        const updateData = {
            ...data,
            image:imageURL,
            campFees:Number(data.campFees)
        };

        updateMutation.mutate(updateData);
     
    };
 
   
    const handleImageUpload = async(e) =>{
       const image = e.target.files[0];
       const formData = new FormData();
       formData.append('image',image);
       const imageUploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
       const result = await axios.post(imageUploadURL,formData);
       console.log(result.data.data.url);
       setImageURL(result.data.data.url);
    };


    return (
        <div >
<label
    htmlFor={`camp_modal_${camp._id}`}
    className="btn btn-secondary btn-xs md:btn-sm px-2 md:px-3"
>
    <FaEdit className="hidden md:inline" />
    Update
</label>

            <input id={`camp_modal_${camp._id}`} className='modal-toggle' type="checkbox" />

            <div className='modal' role='dialog' >           
                 <div className='modal-box mx-auto max-w-3xl bg-base-100 w-full my-12 p-1 shrink-0 shadow-2xl'>

        <div>
            <h2 className='text-2xl md:text-3xl mt-3 md:mt-6 text-secondary text-center font-bold'> Update Medical Camp</h2>
            <div className="card-body py-1 md:py-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3">

                        {/* camp name */}
                        <div>
                            <label className="label">Camp Name</label>
                            <input type="text" {...register('campName', { required: true })} defaultValue={camp.campName}
                                className="input w-full" placeholder="Camp Name" />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="label">Image</label>
                            <input type="file"
                                className="input w-full" onChange={handleImageUpload} placeholder="Image URL" />
                        </div>

                        {/* camp fees */}
                        <div>
                            <label className="label">Camp Fees</label>
                            <input type="number" {...register('campFees', { required: true })} defaultValue={camp.campFees}
                                className="input w-full" placeholder="Camp Fees" />

                        </div>

                        {/* Date & Time */}
                        <div>
                            <label className="label">Date & Time</label>
                            <input type="datetime-local" {...register('dateTime', { required: true })} defaultValue={camp.dateTime}
                                className="input w-full" placeholder="Date & Time" />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="label">Location</label>
                            <input type="text" {...register('location', { required: true })} defaultValue={camp.location}
                                className="input w-full" placeholder="Location" />

                        </div>

                        {/* Healthcare Professional */}
                        <div>
                            <label className="label">Healthcare Professional</label>
                            <input type="text" {...register('healthcareProfessional', { required: true })} defaultValue={camp.healthcareProfessional}
                                className="input w-full" placeholder="Doctor Name" />

                        </div>

                    </fieldset>

                    {/* Description */}
                    <div className='my-2'>
                        <label className="label">Description</label>
                        <textarea
                            rows="5"
                            className="textarea textarea-bordered w-full"
                            placeholder="Camp Description"
                            {...register("description", {
                                required: true,
                            })}  defaultValue={camp.description}
                        />
                    </div>

                    <button className="btn btn-primary w-full mt-4">Update Camp</button>
                </form>
            </div>
        </div>
                 </div>
                    
                 <label htmlFor={`camp_modal_${camp._id}`} className='modal-backdrop'>close</label>
            </div>
        </div>
    );
};

export default ManageCampModal;