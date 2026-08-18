import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    FaMoneyBillWave,
    FaCommentDots,
    FaTrashAlt,
    FaSearch,
} from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import FeedbackModal from "../Feedback/FeedbackModal";
import Loading from "../../../Loading";
import Pagination from "../../Shared/Pagination/Pagination";
import SearchBar from "../../Shared/SearchBar/SearchBar";


const MyRegisteredCamps = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["registeredCamp", user?.email, search, page],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/registeredCamp?email=${user.email}&search=${search}&page=${page}&limit=10`
            );
            return res.data;
        },
    });


    console.log(data)
    const myCamps = data?.result || [];
    const totalPages = data?.totalPages || 1;


    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };


    // cancel regestration mutation
    const cancelRegMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/campRegistration/${id}`);
            return res.data;
        },
        onSuccess: () => {
            refetch();

            Swal.fire({
                title: "Cancelled!",
                text: "Registration cancelled successfully",
                icon: "success"
            });
        },
        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: "Cancellation failed",
                text: error.message,
            });
        }
    });


    // payment
    const handlePay = id => {
        navigate(`/dashboard/payment/${id}`);
    }


    // cancel
    const handleCancel = (id) => {
        console.log(id)

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "Keep Registration"
        }).then((result) => {
            if (result.isConfirmed)
                cancelRegMutation.mutate(id);

        });
    }

    if (isLoading) {
        return (
            <Loading></Loading>
        );
    }

    return (
        <div className="bg-base-100 rounded-xl shadow-xs md:p-6">
       
        <div className="mx-2 md:mx-0">
                    <h2 className="text-2xl md:text-3xl font-bold text-secondary">
                My Registered Camps
            </h2>

            {/* Search */}
            <SearchBar searchText={searchText} setSearchText={setSearchText}
                onSearch={() => {
                    setPage(1);
                    setSearch(searchText.trim());
                }}
                placeholder="Search by camp name, date or healthcare professional..."
            ></SearchBar>
        </div>



            {/* table */}
 {/* table */}
<div className="overflow-x-auto">

    <table className="table table-zebra">

        <thead className="bg-primary text-white">
            <tr>
                <th className="hidden md:table-cell px-1 md:px-4 text-[10px] md:text-sm">
                    #
                </th>

                <th className="px-1 md:px-4 text-[10px] md:text-sm">
                    Camp Name
                </th>

                <th className="px-1 md:px-4 text-[10px] md:text-sm">
                    Fees
                </th>

                <th className="px-1 md:px-4 text-[10px] md:text-sm">
                    Camp date
                </th>

                <th className="hidden md:table-cell px-1 md:px-4 text-[10px] md:text-sm">
                    Confirmation
                </th>

                <th className="px-1 md:px-4 text-[10px] md:text-sm">
                    Payment
                </th>

                <th className="px-1 md:px-4 text-[10px] md:text-sm">
                    Feedback
                </th>

                <th className="px-1 md:px-4 text-[10px] md:text-sm">
                    Cancel
                </th>
            </tr>
        </thead>

        <tbody>
            {myCamps.length === 0 ? (
                <tr>
                    <td
                        colSpan="8"
                        className="text-center py-10 text-xs md:text-base text-primary"
                    >
                        {search
                            ? "No camps matched your search."
                            : "No registered camps found."}
                    </td>
                </tr>
            ) : (
                myCamps.map((camp, index) => (
                    <tr key={camp._id}>

                        {/* Index */}
                        <td className="hidden md:table-cell px-1 md:px-4 text-gray-700 text-xs md:text-sm">
                            {(page - 1) * 10 + index + 1}
                        </td>

{/* Camp Name */}
<td className="px-1 md:px-4">
    <div className="max-w-[80px] sm:max-w-[130px] md:max-w-[200px]">

        <h3 className="font-bold text-gray-600 text-[9px] sm:text-xs md:text-sm truncate">
            {camp.campName}
        </h3>

        <p className="text-[7px] sm:text-[10px] md:text-xs text-gray-500 truncate">
            {camp.location}
        </p>

        {/* Confirmation - mobile only */}
        <span
            className={`md:hidden badge badge-xs mt-1 ${
                camp.confirmationStatus === "confirmed"
                    ? "badge-success"
                    : "badge-error"
            }`}
        >
            {camp.confirmationStatus || "Pending"}
        </span>

    </div>
</td>

                        {/* Fees */}
                        <td className="px-1 md:px-4 font-semibold text-primary text-[9px] sm:text-xs md:text-sm whitespace-nowrap">
                            {camp.campFees} $
                        </td>

                        {/* Camp Date */}
                        <td className="px-1 md:px-4 text-gray-700 text-[9px] sm:text-xs md:text-sm whitespace-nowrap">
                            {formatDate(camp.campDate)}
                        </td>

                        {/* Confirmation */}
                        <td className="hidden md:table-cell px-1 md:px-4">
                            <span
                                className={`badge badge-xs md:badge-sm ${
                                    camp.confirmationStatus === "confirmed"
                                        ? "badge-success"
                                        : "badge-error"
                                }`}
                            >
                                {camp.confirmationStatus || "Pending"}
                            </span>
                        </td>

                        {/* Payment */}
                        <td className="px-1 md:px-4">
                            {camp.paymentStatus === "paid" ? (
                                <button
                                    className="btn btn-success btn-xs md:btn-sm px-2 md:px-6"
                                    disabled
                                >
                                    Paid
                                </button>
                            ) : (
                                <button
                                    onClick={() => handlePay(camp._id)}
                                    className="btn btn-primary btn-xs md:btn-sm px-2 md:px-6"
                                >
                                    Pay
                                </button>
                            )}
                        </td>

                        {/* Feedback */}
                        <td className="px-1 md:px-4">
                            {camp.paymentStatus === "paid" ? (
                                <FeedbackModal camp={camp} />
                            ) : (
                                <button
                                    className="btn btn-outline btn-secondary btn-xs md:btn-sm px-1 md:px-3"
                                    disabled
                                >
                                    <FaCommentDots className="text-[9px] md:text-sm hidden md:block" />
                                    Feedback
                                </button>
                            )}
                        </td>

                        {/* Cancel */}
                        <td className="px-1 md:px-4">
                            <button
                                className="btn btn-error btn-xs md:btn-sm px-1 md:px-3"
                                onClick={() => handleCancel(camp._id)}
                                disabled={camp.paymentStatus === "paid"}
                            >
                                <FaTrashAlt className="text-[9px] md:text-sm hidden md:block" />
                                Cancel
                            </button>
                        </td>

                    </tr>
                ))
            )}
        </tbody>

    </table>
</div>



            {/* pagination */}
            <Pagination page={page} setPage={setPage} totalPages={totalPages}></Pagination>
        </div>
    );
};

export default MyRegisteredCamps;