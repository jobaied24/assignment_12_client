import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error,setError] = useState('');


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
    }

    return (
        <div className='bg-gray-100  max-w-3xl px-8 py-12 rounded-md my-20 w-full mx-auto shadow-xl'>
            <h2 className='text-xl font-bold text-center text-primary mb-2'>Complete Your Payment</h2>
            <p className='text-md text-gray-500 text-center mb-10'>Enter your card details below to Proceed securely</p>
<form onSubmit={handleSubmit} className='space-y-6'>
    <CardElement className='rounded border-3 p-4 border-gray-300'>

    </CardElement>
    <button type='submit' className='btn btn-primary w-full' disabled={!stripe}>Pay</button>
     
     {/* error message */}
     {
        error && <p className='text-error'>{error}</p>
     }
</form>
        </div>
    );
};

export default PaymentForm;