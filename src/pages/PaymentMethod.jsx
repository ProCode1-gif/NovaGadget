// import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const PaymentMethod = () => {
  const [payment, setPayment] = useState({});
  const [paymentUpdate, setPaymentUpdate] = useState({});
  const [addPaymentMethod, setAddPaymentMethod] = useState({});
  useEffect(() => {
    const paymentMethod = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Token not provided");
          return;
        }

        const [getPayment, updatePayment, addPaymentMethod] = await Promise.all(
          [
            axios.get(
              "https://novagadget-server.onrender.com/user/paymentMethod",
            ),
            axios.put(
              "https://novagadget-server.onrender.com/user/paymentMethod",
            ),
            axios.post(
              "https://novagadget-server.onrender.com/user/addPaymentMethod",
            ),
          ],
        );
        setPayment(getPayment.data.payment);
        setPaymentUpdate(updatePayment.data.updatePayment);
        setAddPaymentMethod(addPaymentMethod.data.addPaymentMethod);
      } catch (error) {
        toast.error("Server error");
        return error;
      }
    };
    paymentMethod();
  }, []);

  return (
    <div className="bg-black min-h-screen py-20 px-40 text-white">
      <h2 className="text-4xl font-bold text-center">Payment Methods</h2>
      <div className="flex flex-col space-y-4 mt-20">
        {payment.length === 0 ? (
          <p className="text-center">No payment methods found.</p>
        ) : (
          payment.map((method) => (
            <div
              key={method._id}
              className="border border-gray-500 p-3 rounded-md"
            >
              <p>Type: <input type="text" defaultValue={method.type} /> </p>
              <p>Cardholder Name: <input type="text" defaultValue={method.cardholderName} /> </p>
              <p>Card Number: <input type="text" defaultValue={method.cardNumber} /> </p>
              <p>Expiry Month: <input type="text" defaultValue={method.expiryMonth} /> </p>
              <p>Expiry Year: <input type="text" defaultValue={method.expiryYear} /> </p>
              <p>Bank Name: <input type="text" defaultValue={method.bankName} /> </p>
              <p>Account Number: <input type="text" defaultValue={method.accountNumber} /> </p>
              <p>CVV: <input type="text" defaultValue={method.cvv} /> </p>
              <div className="flex space-x-4 mt-6">
                <button
                  className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
                  onClick={paymentUpdate}
                >
                  Save Changes
                </button>
                <button
                  className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
                  onClick={addPaymentMethod}
                >
                  Add Payment Method
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
