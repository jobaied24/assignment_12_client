import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const PaymentHistory = () => {
    const {user,loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const {data:payments=[],isLoading} = useQuery({
        queryKey:['paymentHistory',user?.email],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/paymentHistory?email=${user?.email}`);
            return res.data; 
        }
    });

    console.log(payments);

    const formatDate = (date) =>
    new Date(date).toLocaleDateString();

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

    
    return (
<div className="bg-base-100 rounded-xl shadow-xs py-6 px-10">
      <h2 className="text-3xl font-bold text-secondary mb-6">
        Payment History
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Camp</th>
              <th>Healthcare Professional</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Paid On</th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10">
                  No payment history found.
                </td>
              </tr>
            ) : (
              payments.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}</td>

                  <td>
                    <div>
                      <h3 className="font-bold text-gray-700">
                        {payment.campName}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {payment.location}
                      </p>
                    </div>
                  </td>

                  
                  <td className='text-gray-600'>
                    {payment.healthcareProfessional}
                  </td>

                  <td className="font-semibold text-primary">
                     {payment.amount} $ 
                  </td>

                  <td className="font-mono text-sm text-gray-600">
                    {payment.transactionId}
                  </td>

                  <td className='text-gray-600'>{formatDate(payment.paidAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default PaymentHistory;