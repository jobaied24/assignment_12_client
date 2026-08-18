import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import Loading from "../../../../Loading";
import ManageCampModal from "./ManageCampModal";
import SearchBar from "../../../Shared/SearchBar/SearchBar";
import Pagination from "../../../Shared/Pagination/Pagination";

const ManageCamps = () => {
    const axiosSecure = useAxiosSecure();

    const [searchText, setSearchText] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const {
        data,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["camps", search, page],

        queryFn: async () => {
            const res = await axiosSecure.get(
                `/camps?page=${page}&search=${search}&limit=10`
            );

            return res.data;
        },
    });

    const camps = data?.result || [];
    const totalPages = data?.totalPages || 1;
    const total = data?.total || 0;


    // Format date and time
    const formatDateTime = (date) => {
        const d = new Date(date);

        return (
            <>
                <p className="text-[10px] sm:text-xs md:text-sm">
                    {d.toLocaleDateString()}
                </p>

                <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500">
                    {d.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            </>
        );
    };


    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const result = await axiosSecure.delete(
                `/delete-camp/${id}`
            );

            return result.data;
        },

        onSuccess: () => {
            refetch();

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Camp deleted successfully!",
                showConfirmButton: false,
                timer: 1500,
            });
        },

        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: "Failed to delete camp",
                text: error.message,
            });
        },
    });


    // Handle delete
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {

            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }

        });
    };


    if (isLoading) {
        return <Loading />;
    }


    return (
        <div className="bg-base-100 rounded-xl shadow-xs py-3 md:p-6">

<div className="mx-2 md:mx-0">
            {/* Header */}
            <div className="flex justify-between items-center mb-2 md:mb-3 gap-2">

                <h2 className="text-xl md:text-3xl font-bold text-secondary">
                    Manage Camps
                </h2>

                <div className="badge badge-primary badge-sm md:badge-lg whitespace-nowrap">
                    Total: {total}
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

                    {/* Table Head */}
                    <thead className="bg-primary text-white">

                        <tr>

                            {/* Index */}
                            <th className="hidden md:table-cell px-2 py-2 text-xs md:text-sm">
                                #
                            </th>

                            {/* Camp */}
                            <th className="px-2 py-2 text-[10px] sm:text-xs md:text-sm">
                                Camp Name
                            </th>

                            {/* Date */}
                            <th className="px-2 py-2 text-[10px] sm:text-xs md:text-sm">
                                Date
                            </th>

                            {/* Doctor */}
                            <th className="hidden sm:table-cell px-2 py-2 text-xs md:text-sm">
                                Doctor
                            </th>

                            {/* Participants */}
                            <th className="hidden md:table-cell px-2 py-2 text-xs md:text-sm">
                                Participants
                            </th>

                            {/* Fees */}
                            <th className="px-2 py-2 text-[10px] sm:text-xs md:text-sm">
                                Fees
                            </th>

                            {/* Actions */}
                            <th
                                colSpan="2"
                                className="px-1 py-2 text-[10px] sm:text-xs md:text-sm text-center"
                            >
                                Actions
                            </th>

                        </tr>

                    </thead>


                    {/* Table Body */}
                    <tbody>

                        {camps.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="8"
                                    className="text-center text-primary text-sm md:text-lg py-10"
                                >
                                    {search
                                        ? "No camps matched your search."
                                        : "No camps found."}
                                </td>

                            </tr>

                        ) : (

                            camps.map((camp, index) => (

                                <tr key={camp._id}>

                                    {/* Index */}
                                    <td className="hidden md:table-cell px-2 py-2 text-xs md:text-sm">
                                        {(page - 1) * 10 + index + 1}
                                    </td>


                                    {/* Camp Name */}
<td className="px-2 py-2">
    <div className="max-w-[110px] sm:max-w-[150px] md:max-w-none">

        <h3 className="font-bold text-gray-700 text-xs md:text-sm truncate">
            {camp.campName}
        </h3>

        <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 truncate">
            {camp.location}
        </p>

        {/* Doctor name on small screens */}
        <p className="sm:hidden text-[9px] text-primary truncate">
            Dr. {camp.healthcareProfessional}
        </p>

    </div>
</td>

                                    {/* Date */}
                                    <td className="px-2 py-2 whitespace-nowrap">
                                        {formatDateTime(camp.dateTime)}
                                    </td>


                                    {/* Doctor */}
                                    <td className="hidden sm:table-cell px-2 py-2 text-xs md:text-sm max-w-[120px] md:max-w-none truncate">
                                        {camp.healthcareProfessional}
                                    </td>


                                    {/* Participants */}
                                    <td className="hidden md:table-cell px-2 py-2">

                                        <span className="badge badge-secondary badge-sm">
                                            {camp.participantCount}
                                        </span>

                                    </td>


                                    {/* Fees */}
                                    <td className="px-2 py-2 font-semibold text-primary text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
                                        {camp.campFees} $
                                    </td>


                                    {/* Update */}
                                    <td className="px-0.5 sm:px-1 py-2 text-center">

                                        <ManageCampModal
                                            camp={camp}
                                            refetch={refetch}
                                        />

                                    </td>


                                    {/* Delete */}
                                    <td className="px-0.5 sm:px-1 py-2 text-center">

                                        <button
                                            onClick={() =>
                                                handleDelete(camp._id)
                                            }
                                            className="btn btn-error btn-xs md:btn-sm px-1.5 sm:px-2 md:px-3"
                                        >

                                            {/* Hide icon on mobile */}
                                            <FaTrashAlt className="hidden md:inline" />

                                            Delete

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

export default ManageCamps;