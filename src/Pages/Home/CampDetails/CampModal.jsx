import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import { AuthContext } from '../../../Context/AuthContext';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const CampModal = ({ camp,refetch}) => {
    const { register, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const onSubmit = data => {
        const registrationData = {
            ...data,
            campFees:Number(camp.campFees),
            campId:camp._id,
            createAt:new Date().toISOString()
        }
        console.log(registrationData);

        axiosSecure.post('/campRegistration',registrationData)
        .then((res)=>{
            console.log(res.data);
            refetch();
        })
        .catch((error)=>{
            console.log(error.message);
        })
    }

    return (
        <div>
            {/* modal */}
            <label htmlFor='camp_modal' className="btn btn-primary btn-lg px-10 mr-10">
                Join Camp
                <FaArrowRight className='ml-1 text-xl' />
            </label>

            <input type="checkbox" id='camp_modal' className='modal-toggle' />

            <div className='modal' role='dialog'>
                <div className='modal-box max-w-5xl'>
                    <div className='card-body py-10 px-2'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="fieldset grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* camp name */}
                                <div>
                                    <label className="label">Camp Name</label>
                                    <input type="text" defaultValue={camp.campName} readOnly {...register('campName', { required: true })}
                                        className="input w-full" placeholder="Camp Name" />
                                </div>

                                {/* camp fees */}
                                <div>
                                    <label className="label">Camp Fees</label>
                                    <input type="number" defaultValue={camp.campFees} readOnly {...register('campFees', { required: true })}
                                        className="input w-full" placeholder="Camp Fees" />

                                </div>

                                {/* Location */}
                                <div>
                                    <label className="label">Location</label>
                                    <input type="text" defaultValue={camp.location} readOnly {...register('location', { required: true })}
                                        className="input w-full" placeholder="Location" />

                                </div>

                                {/* Healthcare Professional */}
                                <div>
                                    <label className="label">Healthcare Professional</label>
                                    <input type="text" defaultValue={camp.healthcareProfessional} readOnly {...register('healthcareProfessional', { required: true })}
                                        className="input w-full" placeholder="Doctor Name" />
                                </div>

                                {/* Participent name */}
                                <div>
                                    <label className="label">Participant Name </label>
                                    <input type="text" defaultValue={user?.displayName} readOnly {...register('participantName', { required: true })}
                                        className="input w-full" />
                                </div>

                                {/* Participant Email */}
                                <div>
                                    <label className="label">Participant Email</label>
                                    <input type="text" defaultValue={user?.email} readOnly {...register('participantEmail', { required: true })}
                                        className="input w-full" />
                                </div>

                                {/* Age */}
                                <div>
                                    <label className="label">Age</label>
                                    <input type="text" {...register('age', { required: true })}
                                        className="input w-full" placeholder="Age" />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="label">Phone Number</label>
                                    <input type="text" {...register('phoneNumber', { required: true })}
                                        className="input w-full" placeholder="Phone Number" />
                                </div>

                                {/* Emergency Contact */}
                                <div>
                                    <label className="label">Emergency Contact</label>
                                    <input type="text" {...register('contact', { required: true })}
                                        className="input w-full" placeholder="Emergency Contact" />
                                </div>

                                {/* gender */}
                                <div>
                                    <label className="label">Gender</label>

                                    <select
                                        {...register('gender', { required: true })}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                            </fieldset>


                            <button className="btn btn-primary w-full mt-4">Add Camp</button>
                        </form>
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor="camp_modal">Close</label>
            </div>
        </div>
    );
};

export default CampModal;