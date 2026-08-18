import React, { useState } from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Pagination from '../../Shared/Pagination/Pagination';
import SearchBar from '../../Shared/SearchBar/SearchBar';

const ManageRegisteredCamps = () => {
    const axiosSecure = useAxiosSecure();

    const [searchText, setSearchText] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const {
        data,
        isLoading,
        refetch
    } = useQuery({
        queryKey: ['allregisteredCamps', search, page],

        queryFn: async () => {
            const result = await axiosSecure.get(
                `/allRegisteredCamp?page=${page}&search=${search}&limit=10`
            );

            return result.data;
        }
    });

    const allregisteredCamps = data?.result || [];
    const totalPages = data?.totalPages || 1;


    // Confirmation mutation
    const confirmationMutation = useMutation({
        mutationFn: async (id) => {
            const result = await axiosSecure.patch(
                `/update-confirmationStatus/${id}`
            );

            return result.data;
        },

        onSuccess: () => {
            refetch();

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registration Confirmed",
                showConfirmButton: false,
                timer: 1500
            });
        },

        onError: () => {
            Swal.fire({
                icon: "error",
                title: "Confirmation Failed",
                text: "Failed to update the confirmation status. Please try again.",
            });
        }
    });


    // Cancel registration mutation
    const cancelMutation = useMutation({
        mutationFn: async (id) => {
            const result = await axiosSecure.delete(
                `/organizer/campRegistration/${id}`
            );

            return result.data;
        },

        onSuccess: () => {
            refetch();

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registration cancelled",
                showConfirmButton: false,
                timer: 1500
            });
        },

        onError: () => {
            Swal.fire({
                icon: "error",
                title: "Cancellation Failed",
                text: "Unable to cancel the registration. Please try again.",
            });
        }
    });


    // Update confirmation status
    const handleUpdateConfiramtion = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm"
        }).then((result) => {

            if (result.isConfirmed) {
                confirmationMutation.mutate(id);
            }

        });
    };


    // Cancel registration
    const handleCancelRegistration = (id) => {

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
    };


    if (isLoading) {
        return (
            <div className="p-6">
                Loading...
            </div>
        );
    }


    return (
        <div className="bg-base-100 rounded-xl shadow-xs py-3 md:p-6">

<div className='mx-2 md:mx-0'>
            {/* Header */}
            <div className="flex justify-between items-center mb-2 md:mb-3 gap-2">

                <h2 className="text-xl md:text-3xl font-bold text-secondary">
                    Manage Registered Camps
                </h2>

                <div className="badge badge-primary badge-sm md:badge-lg whitespace-nowrap">
                    Total: {data?.total || 0}
                </div>

            </div>

            {/* Search */}
            <SearchBar
                searchText={searchText}
                setSearchText={setSearchText}
                onSearch={() => {
                    setPage(1);
                    setSearch(searchText.trim());
                }}
                placeholder="Search by camp name, date or healthcare professional..."
            />

</div>

            {/* Table */}
            <div className="overflow-hidden mt-2">

                <table className="table table-zebra w-full">

                    <thead className="bg-primary text-white">

                        <tr>

                            {/* Index */}
                            <th className="hidden md:table-cell px-2 py-2 text-xs md:text-sm">
                                #
                            </th>

                            {/* Camp */}
                            <th className="px-2 py-2 text-xs md:text-sm">
                                Camp
                            </th>

                            {/* Fees */}
                            <th className="px-2 py-2 text-xs md:text-sm">
                                Fees
                            </th>

                            {/* Participant */}
                            <th className="px-2 py-2 text-xs md:text-sm">
                                Participant
                            </th>

                            {/* Payment - hidden on mobile */}
                            <th className="hidden sm:table-cell px-2 py-2 text-xs md:text-sm">
                                Payment
                            </th>

                            {/* Confirmation */}
                            <th className="px-1 py-2 text-xs md:text-sm text-center">
                                Confirmation
                            </th>

                            {/* Actions */}
                            <th className="px-1 py-2 text-xs md:text-sm text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {allregisteredCamps.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={7}
                                    className="text-center py-12 md:py-16 text-sm md:text-lg text-gray-500"
                                >
                                    No registered camps found.
                                </td>

                            </tr>

                        ) : (

                            allregisteredCamps.map((camp, index) => (

                                <tr key={camp._id}>

                                    {/* Index */}
                                    <td className="hidden md:table-cell px-2 py-2 text-xs md:text-sm">
                                        {(page - 1) * 10 + index + 1}
                                    </td>


                                    {/* Camp */}
                                    <td className="px-2 py-2">

                                        <div className="max-w-[100px] sm:max-w-[140px] md:max-w-[200px]">

                                            <h3 className="font-bold text-gray-700 text-[10px] sm:text-xs md:text-sm truncate">
                                                {camp.campName}
                                            </h3>

                                            <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-500 truncate">
                                                {camp.location}
                                            </p>

                                        </div>

                                    </td>


                                    {/* Fees */}
                                    <td className="px-2 py-2 font-semibold text-primary text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
                                        {camp.campFees} $
                                    </td>


                                    {/* Participant */}
                                    <td className="px-2 py-2">

                                        <div className="max-w-[100px] sm:max-w-[130px] md:max-w-none">

                                            <p className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 truncate">
                                                {camp.participantName}
                                            </p>


                                            {/* Payment status - mobile */}
                                            <span
                                                className={`sm:hidden badge badge-xs mt-1 ${
                                                    camp.paymentStatus === "paid"
                                                        ? "badge-success"
                                                        : "badge-error"
                                                }`}
                                            >
                                                {camp.paymentStatus || "Unpaid"}
                                            </span>

                                        </div>

                                    </td>


                                    {/* Payment - desktop/tablet */}
                                    <td className="hidden sm:table-cell px-2 py-2">

                                        <span
                                            className={`badge badge-xs md:badge-sm ${
                                                camp.paymentStatus === "paid"
                                                    ? "badge-success"
                                                    : "badge-error"
                                            }`}
                                        >
                                            {camp.paymentStatus || "Unpaid"}
                                        </span>

                                    </td>


                                    {/* Confirmation */}
                                    <td className="px-1 py-2 text-center">

                                        {camp.confirmationStatus === "confirmed" ? (

                                            <span className="badge badge-xs md:badge-sm badge-success gap-1">

                                                <FaCheckCircle className="hidden sm:inline" />

                                                <span>
                                                    Confirmed
                                                </span>

                                            </span>

                                        ) : (

                                            <button
                                                onClick={() =>
                                                    handleUpdateConfiramtion(camp._id)
                                                }
                                                className="btn btn-primary btn-xs md:btn-sm px-2 md:px-3"
                                            >
                                                Pending
                                            </button>

                                        )}

                                    </td>


                                    {/* Actions */}
                                    <td className="px-1 py-2 text-center">

                                        <button
                                            onClick={() =>
                                                handleCancelRegistration(camp._id)
                                            }
                                            className="btn btn-error btn-xs md:btn-sm px-2 md:px-3"
                                        >

                                            {/* Icon only on desktop */}
                                            <FaTrashAlt className="hidden md:inline" />

                                            Cancel

                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>


                {/* Pagination */}
                <div className="mt-3">

                    <Pagination
                        page={page}
                        setPage={setPage}
                        totalPages={totalPages}
                    />

                </div>

            </div>

        </div>
    );
};

export default ManageRegisteredCamps;