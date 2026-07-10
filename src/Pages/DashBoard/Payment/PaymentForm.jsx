import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { redirect, useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { AuthContext } from '../../../Context/AuthContext';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error,setError] = useState('');
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();


   const {data:registeredInfo={},isLoading}=useQuery({
    queryKey:['registrationId',id],
    queryFn:async()=>{
        const res = await axiosSecure.get(`/registeredCamp/${id}`);
        return res.data;
    }
   });

   console.log(registeredInfo);
   const campFees = registeredInfo.campFees;
   

//    payment
    const handleSubmit = async(e) =>{
        e.preventDefault();

        if(!stripe && !elements){
            return;
        };
    
        const card = elements.getElement(CardElement);

        if(!card){
            return;
        };

        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card
        });

        if(error){
            console.log('error',error);
            setError(error.message);
        };

        if(paymentMethod){
            setError('');
            console.log('paymentMethod',paymentMethod);
        };


        // payment Intent
        const res = await axiosSecure.post("/create-payment-intent",{
            campFees,
            id
        });

        console.log(res);

        const clientSecret = res.data.clientSecret;
        console.log(clientSecret);

        // confirm Payment
        const result = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card,
                billing_details:{
                    name:user?.displayName,
                    email:user?.email
                }
            }
        });


        if(result.error){
            setError(result.error.message);
        }
        else if(result.paymentIntent.status === 'succeeded'){
            
            setError('');


            Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Payment successful",
  showConfirmButton: false,
  timer: 1500
});


// save payment history and status update
const paymentData = {
    registrationId:id,
    transactionId:result.paymentIntent.id,
    participentEmail:user.email,
    amount:campFees,
    campName : registeredInfo.campName,
    healthcareProfessional:registeredInfo.healthcareProfessional,
    campDate: registeredInfo.campDate,
    location: registeredInfo.location
};

const res = await axiosSecure.post('/payments',paymentData);
 
console.log(res);

if(res.data.paymentRes.insertedId && res.data.updateStatus.modifiedCount){
    console.log('payment data save successfully')
}


// redirect to my Registered 
navigate('/dashboard/myRegesteredCamps')

        }
    }

    return (
        <div className='bg-gray-100  max-w-3xl px-10 py-12 rounded-md my-20 w-full mx-auto shadow-xl'>
            <h2 className='text-xl font-bold text-center text-primary mb-2'>Complete Your Payment</h2>
            <p className='text-md text-gray-500 text-center mb-10'>Enter your card details below to Proceed securely</p>
<form onSubmit={handleSubmit} className='space-y-6'>
    <CardElement className='rounded border-3 p-4 border-gray-300'>

    </CardElement>
    <button type='submit' className='btn btn-primary w-full' disabled={!stripe}>Pay {campFees} $</button>
     
     {/* error message */}
     {
        error && <p className='text-error'>{error}</p>
     }
</form>
        </div>
    );
};

export default PaymentForm;