import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCommentDots } from 'react-icons/fa';
import { FaStar } from "react-icons/fa";
import { AuthContext } from '../../../Context/AuthContext';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const FeedbackModal = ({camp}) => {
  const [rating, setReting] = useState(0);
  const { register,handleSubmit } = useForm();
  const {user}= useContext(AuthContext);
  const axiosSecure = useAxiosSecure();


// feedback mutation
const feedbackMutation = useMutation({
  mutationFn:async(feedbackData)=>{
    const res = await axiosSecure.post('/feedbackRating',feedbackData);
    return res.data;
  },

  onSuccess: () => {
Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Thank you!",
  text: "Feedback submitted successfully.",
  showConfirmButton: false,
  timer: 1500
});
  },

   onError: (error) => {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: error.message,
    });
  },
})


  const onSubmit = data =>{
    const feedbackData = {
      registrationId:camp._id,
      campId:camp.campId,

      campName:camp.campName,
      location:camp.location,
      healthcareProfessional:camp.healthcareProfessional,

      participantName : user.displayName,
      participantEmail : user.email,

      rating,
      feedback:data.feedback
    }
    console.log(feedbackData);

   feedbackMutation.mutate(feedbackData);
  }

  return (
    <div>
      <label htmlFor="feedback_modal" className="btn btn-outline btn-secondary btn-sm" >
        <FaCommentDots />
        Feedback
      </label>

      <input type="checkbox" id='feedback_modal' className='modal-toggle' />

      <div className='modal' role='dialog'>

        <div className='modal-box rounded-xl p-7'>

          <h3 className="text-2xl text-secondary font-bold mb-6">
            Camp Feedback
          </h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Rating */}
            <div className="mb-7">
              <label className="label mb-1">Rating</label>

              <div className='flex gap-8 text-4xl'>
                {
                  [1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      onClick={() => setReting(star)}
                      className={`cursor-pointer transition ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
                    >
                    </FaStar>
                  ))
                }
              </div>
            </div>

            {/* Feedback */}
            <div className="mb-6">
              <label className="label">Feedback</label>

              <textarea
                {...register('feedback', { required: true })}
                className="textarea textarea-bordered border-2 resize-none border-blue-300 w-full h-32"
                placeholder="Share your experience..."
              />

            </div>

            <button className="btn btn-primary rounded-md  w-full">
              Submit Feedback
            </button>

          </form>
        </div>

        <label htmlFor="feedback_modal" className='modal-backdrop'>Close</label>
      </div>
      
    </div>
  );
};

export default FeedbackModal;