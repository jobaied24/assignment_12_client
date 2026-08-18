import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import useAxios from '../../../../Hook/useAxios';
import Swal from 'sweetalert2';

const AddCamp = () => {
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure();
    const [ImageURL, setImageURL] = useState(null);

    const onSubmit = async (data) => {

        const campData = {
            ...data,
            image: ImageURL,
            participantCount: 0,
            campFees: Number(data.campFees),
            createAt: new Date().toISOString()
        };

        console.log(campData);

        await axiosSecure.post('/addCamps', campData)
            .then(res => {
                console.log(res.data);

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch((error) => {
                console.log(error);

                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Add Camp',
                    text: error.message
                });
            })

    };

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        const imageUploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
        const result = await axios.post(imageUploadURL, formData);
        console.log(result.data.data.url);
        setImageURL(result.data.data.url);
    };


    return (
        <div className="card mx-auto max-w-4xl bg-base-100 w-full  md:my-12 shrink-0 shadow-2xl">
            <h2 className='text-2xl md:text-3xl mt-2 md:mt-4 text-secondary text-center font-bold'>Add Medical Camp</h2>
            <div className="card-body py-1 md:py-4 px-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">

                        {/* camp name */}
                        <div>
                            <label className="label">Camp Name</label>
                            <input type="text" {...register('campName', { required: true })}
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
                            <input type="number" {...register('campFees', { required: true })}
                                className="input w-full" placeholder="Camp Fees" />

                        </div>

                        {/* Date & Time */}
                        <div>
                            <label className="label">Date & Time</label>
                            <input type="datetime-local" {...register('dateTime', { required: true })}
                                className="input w-full" placeholder="Date & Time" />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="label">Location</label>
                            <input type="text" {...register('location', { required: true })}
                                className="input w-full" placeholder="Location" />

                        </div>

                        {/* Healthcare Professional */}
                        <div>
                            <label className="label">Healthcare Professional</label>
                            <input type="text" {...register('healthcareProfessional', { required: true })}
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
                            })}
                        />
                    </div>

                    <button className="btn btn-primary w-full mt-4">Add Camp</button>
                </form>
            </div>
        </div>
    );
};

export default AddCamp;