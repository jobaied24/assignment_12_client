import React from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loading from "../../../Loading";

const ManageCamps = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {
        data: camps = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["camps"],
        queryFn: async () => {
            const res = await axiosSecure.get("/camps");
            return res.data;
        },
    });


    const formatDateTime = (date) => {
        const d = new Date(date);

        return (
            <>
                <p>{d.toLocaleDateString()}</p>
                <p className="text-xs text-gray-500">
                    {d.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            </>
        );
    };


    // delete Mutation 
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const result = await axiosSecure.delete(`/delete-camp/${id}`);
            return result.data;
        },

        onSuccess: () => {
            refetch();

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Camp deleted successfully!",
                showConfirmButton: false,
                timer: 1500
            });
        },
        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: "Failed to delete camp",
                text: error.message,
            });
        }
    })


    // delete 
    const handleDelete = id => {
        console.log(id);

        Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {

    if (result.isConfirmed) {
      deleteMutation.mutate(id);   
  }
});
    }


    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="bg-base-100 rounded-xl shadow-xs p-6">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-secondary">
                    Manage Camps
                </h2>

                <div className="badge badge-primary badge-lg">
                    Total Camps: {camps.length}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">

                    <thead className="bg-primary text-white">
                        <tr>
                            <th>#</th>
                            <th>Camp Name</th>
                            <th>Date</th>
                            <th>Doctor</th>
                            <th>Participants</th>
                            <th>Fees</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {camps.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="9"
                                    className="text-center text-primary text-lg py-10"
                                >
                                    No camps found.
                                </td>
                            </tr>
                        ) : (
                            camps.map((camp, index) => (
                                <tr key={camp._id}>

                                    {/* Index */}
                                    <td>{index + 1}</td>

                                    {/* Camp */}
                                    <td>
                                        <div>
                                            <h3 className="font-bold text-gray-700">
                                                {camp.campName}
                                            </h3>

                                            <p className="text-xs text-gray-500">
                                                {camp.location}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Date */}
                                    <td>
                                        {formatDateTime(camp.dateTime)}
                                    </td>

                                    {/* Doctor */}
                                    <td>{camp.healthcareProfessional}</td>

                                    {/* Participants */}
                                    <td>
                                        <span className="badge badge-secondary">
                                            {camp.participantCount}
                                        </span>
                                    </td>

                                    {/* Fee */}
                                    <td className="font-semibold text-primary">
                                        {camp.campFees} $
                                    </td>

                                    {/* Update */}
                                    <td>
                                        <button
                                            className="btn btn-secondary btn-sm"
                                        >
                                            <FaEdit />
                                            Update
                                        </button>
                                    </td>

                                    {/* Delete */}
                                    <td>
                                        <button
                                            onClick={() => { handleDelete(camp._id) }}
                                            className="btn btn-error btn-sm"
                                        >
                                            <FaTrashAlt />
                                            Delete
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

export default ManageCamps;