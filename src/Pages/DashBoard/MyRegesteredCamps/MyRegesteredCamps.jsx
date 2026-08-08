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
        <div className="bg-base-100 rounded-xl shadow-xs p-6">
            <h2 className="text-3xl font-bold text-secondary mb-5">
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



            {/* table */}
            <div className="overflow-x-auto">

                <table className="table table-zebra">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>#</th>
                            <th>Camp Name</th>
                            <th>Fees</th>
                            <th>Participant</th>
                            <th>Camp date</th>
                            <th>Confirmation</th>
                            <th>Payment</th>
                            <th>Feedback</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>

                    <tbody>
                        {myCamps.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="text-center py-10 text-primary">
                                    {search
                                        ? "No camps matched your search."
                                        : "No registered camps found."}
                                </td>
                            </tr>
                        ) : (
                            myCamps.map((camp, index) => (
                                <tr key={camp._id}>

                                    {/* index */}
                                    <td className="text-gray-700">
                                        {(page - 1) * 10 + index + 1}
                                    </td>

                                    {/* camp name */}
                                    <td>
                                        <div>
                                            <h3 className="font-bold text-gray-600">{camp.campName}</h3>
                                            <p className="text-xs text-gray-500">
                                                {camp.location}
                                            </p>
                                        </div>
                                    </td>

                                    {/* camp fees */}
                                    <td className="font-semibold text-primary">
                                        {camp.campFees} $
                                    </td>

                                    {/* participantName */}
                                    <td className="text-gray-700">{camp.participantName}</td>

                                    {/* camp date */}
                                    <td className="text-gray-700">{formatDate(camp.campDate)}</td>

                                    {/* confirmationStatus */}
                                    <td>
                                        <span
                                            className={`badge ${camp.confirmationStatus === "confirmed"
                                                ? "badge-success"
                                                : "badge-error"
                                                }`}
                                        >
                                            {camp.confirmationStatus || "Pending"}
                                        </span>
                                    </td>

                                    {/* paymentStatus */}
                                    <td>
                                        {camp.paymentStatus === "paid" ? (
                                            <button
                                                className="btn btn-success btn-sm px-6"
                                                disabled
                                            >
                                                Paid
                                            </button>
                                        ) : (
                                            <button onClick={() => { handlePay(camp._id) }} className="btn btn-primary btn-sm px-6">
                                                {/* <FaMoneyBillWave /> */}
                                                Pay
                                            </button>
                                        )}
                                    </td>


                                    {/* feedback */}
                                    <td>
                                        {
                                            camp.paymentStatus === "paid" ? <FeedbackModal camp={camp}></FeedbackModal>
                                                : <button
                                                    className="btn btn-outline btn-secondary btn-sm"
                                                    disabled
                                                >
                                                    <FaCommentDots />
                                                    Feedback
                                                </button>
                                        }
                                    </td>

                                    {/* cancel */}
                                    <td>
                                        <button
                                            className="btn btn-error btn-sm"
                                            onClick={() => handleCancel(camp._id)}
                                            disabled={camp.paymentStatus === "paid"}
                                        >
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

            {/* pagination */}
            <Pagination page={page} setPage={setPage} totalPages={totalPages}></Pagination>
        </div>
    );
};

export default MyRegisteredCamps;