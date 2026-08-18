import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import SearchBar from "../../Shared/SearchBar/SearchBar";
import Pagination from "../../Shared/Pagination/Pagination";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email, search, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/paymentHistory?email=${user?.email}&search=${search}&page=${page}&limit=10`
      );

      return res.data;
    },
  });

  const payments = data?.result || [];
  const totalPages = data?.totalPages || 1;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-xl shadow-xs  md:p-6">
     <div className="mx-2"> 
      {/* Header */}
      <h2 className="text-xl md:text-3xl font-bold text-secondary  md:mb-3">
        Payment History
      </h2>

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
      <div className="overflow-hidden mt-1 md:mt-2">
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

              {/* Doctor */}
              <th className="hidden sm:table-cell px-2 py-2 text-xs md:text-sm">
                Healthcare Professional
              </th>

              {/* Amount */}
              <th className="px-2 py-2 text-xs md:text-sm">
                Amount
              </th>

              {/* Transaction */}
              <th className="px-2 py-2 text-xs md:text-sm">
                Transaction ID
              </th>

              {/* Paid On */}
              <th className="px-2 py-2 text-xs md:text-sm">
                Paid On
              </th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-sm md:text-lg text-gray-500"
                >
                  No payment history found.
                </td>
              </tr>
            ) : (
              payments.map((payment, index) => (
                <tr key={payment._id}>
                  {/* Index */}
                  <td className="hidden md:table-cell px-2 py-2 text-xs md:text-sm">
                    {(page - 1) * 10 + index + 1}
                  </td>

                  {/* Camp */}
                  <td className="px-2 py-2">
                    <div className="max-w-[100px] sm:max-w-[160px] md:max-w-none">
                      <h3 className="font-bold text-gray-700 text-xs md:text-sm truncate">
                        {payment.campName}
                      </h3>

                      <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 truncate">
                        {payment.location}
                      </p>

                      {/* Doctor for small screen */}
                      <p className="sm:hidden text-[9px] text-primary truncate mt-0.5">
                        Dr. {payment.healthcareProfessional}
                      </p>
                    </div>
                  </td>

                  {/* Doctor */}
                  <td className="hidden sm:table-cell px-2 py-2">
                    <p className="text-xs md:text-sm text-gray-600 max-w-[120px] md:max-w-none truncate">
                      {payment.healthcareProfessional}
                    </p>
                  </td>

                  {/* Amount */}
                  <td className="px-2 py-2 font-semibold text-primary text-xs md:text-sm whitespace-nowrap">
                    {payment.amount} $
                  </td>

                  {/* Transaction ID */}
                  <td className="px-2 py-2">
                    <p
                      className="font-mono text-[10px] md:text-sm text-gray-600 max-w-[130px] md:max-w-[240px] truncate"
                      title={payment.transactionId}
                    >
                      {payment.transactionId}
                    </p>
                  </td>

                  {/* Paid On */}
                  <td className="px-2 py-2 text-[10px] md:text-sm text-gray-600 whitespace-nowrap">
                    {formatDate(payment.paidAt)}
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

export default PaymentHistory;