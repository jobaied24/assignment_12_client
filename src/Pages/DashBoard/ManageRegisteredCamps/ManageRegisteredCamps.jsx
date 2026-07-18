import React from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageRegisteredCamps = () => {
    const axiosSecure = useAxiosSecure();

    const {data:allregisteredCamps=[],isLoading,refetch} = useQuery({
     queryKey:['allregisteredCamps'],
     queryFn:async()=>{
        const result = await axiosSecure.get('/allRegisteredCamp');
        return result.data;
     }
    });

    console.log(allregisteredCamps);
   
    // confirmation mutation
    const confirmationMutation = useMutation({
      mutationFn:async(id)=>{
        const result = await axiosSecure.patch(`/update-confirmationStatus/${id}`);
        return result.data;
      },
      onSuccess:()=>{
        refetch();
        
        Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Registration Confirmed",
  showConfirmButton: false,
  timer: 1500
});
      },

      onError:()=>{
        Swal.fire({
  icon: "error",
  title: "Confirmation Failed",
  text: "Failed to update the confirmation status. Please try again.",
});
      }
    });


    // cancel registration mutation
    const cancelMutation = useMutation({
      mutationFn:async(id)=>{
        const result = await axiosSecure.delete(`/organizer/campRegistration/${id}`);
        return result.data;
      },
      onSuccess:()=>{
                refetch();
        
        Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Registration cancelled",
  showConfirmButton: false,
  timer: 1500
});
      },
      
      onError:()=>{
        Swal.fire({
  icon: "error",
  title: "Cancellation Failed",
  text: "Unable to cancel the registration. Please try again.",
});
    }
})


    // update confirm status
    const handleUpdateConfiramtion = id =>{
      Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, confirm"
}).then((result) => {
  if (result.isConfirmed){
    confirmationMutation.mutate(id);
  }
});
      
    };


    // cancel registration
    const handleCancelRegistration = id =>{

      Swal.fire({
  title: "Cancel Registration?",
  text: "This registration will be permanently removed.",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
 confirmButtonText: "Yes, Remove",
  cancelButtonText: "Keep Registration"
}).then((result) => {
  if (result.isConfirmed) {
    cancelMutation.mutate(id);
  }
});

    }

    return (
        <div className='bg-base-100 p-6'>
           <h2 className='text-3xl font-bold text-secondary mb-5'>Manage Registered Camps</h2>

           <div className="overflow-x-auto">
   <table className="table table-zebra">

          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Camp</th>
              <th>Fees</th>
              <th>Participant</th>
              <th>Payment</th>
              <th className="text-center">Confirmation</th>
              <th >Actions</th>
            </tr>
          </thead>

          <tbody>

            {allregisteredCamps.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-16 text-lg text-gray-500"
                >
                  No registered camps found.
                </td>
              </tr>
            ) : (
              allregisteredCamps.map((camp, index) => (
                <tr key={camp._id} className="hover">

                  <td>{index + 1}</td>

                  <td>
                    <div>
                      <h3 className="font-bold">
                        {camp.campName}
                      </h3>

                      <p className="text-xs text-gray-500">
                        {camp.location}
                      </p>
                    </div>
                  </td>

                  <td className="font-semibold text-primary">
                    {camp.campFees} $
                  </td>

                  <td>{camp.participantName}</td>

                  {/* Payment */}
                  <td>
                    <span
                      className={`badge ${
                        camp.paymentStatus === "paid"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {camp.paymentStatus || "Unpaid"}
                    </span>
                  </td>

                  {/* Confirmation */}
                  <td className='text-center'>
                    {camp.confirmationStatus === "confirmed" ? (
                      <span className="badge badge-success gap-1">
                        <FaCheckCircle />
                        Confirmed
                      </span>
                    ) : (
                      <button
                      onClick={()=>handleUpdateConfiramtion(camp._id)}
                      className="btn btn-sm btn-primary">
                        Pending
                      </button>
                    )}
                  </td>

                  {/* Actions */}
                  <td>
            
                      <button
                      onClick={()=>handleCancelRegistration(camp._id)}
                      className="btn btn-error btn-sm">
                        <FaTrashAlt />
                        Cancel
                      </button>
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>
           </div>
        </div>
    );
};

export default ManageRegisteredCamps;