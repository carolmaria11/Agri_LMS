"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Script from "next/script";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const AgriallyPro = () => {
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const {user} =useUser();

  useEffect(() => {
    // Ensure Razorpay script is loaded before initializing payment
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  const createSubscription = async (planId) => {
    try {
      const response = await axios.post("/api/create-subscription", {
        plan_id: planId,
      });

      console.log("Subscription Created:", response.data);
      setSubscriptionId(response.data.id);
      makePayment(response.data.id); // Pass subscriptionId directly
    } catch (error) {
      console.error("Error creating subscription:", error);
    }
  };

  const makePayment = (subId) => {
    if (!razorpayLoaded || !window.Razorpay) {
      console.error("Razorpay SDK not loaded.");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY,
      subscription_id: subId,
      name: "AgriAlly",
      description: "AgriLearn Pro Membership",
      handler: async (resp) => {
        console.log("Payment Success:", resp);
        if(resp)
        {addNewMember(resp?.razorpay_payment_id)}
      },
      theme: { color: "#00A36C" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const addNewMember=(paymentId)=>{
    GlobalApi.addNewMember(user.primaryEmailAddress.emailAddress,paymentId)
    .then(resp=>{
      console.log(resp);
      if(resp)
      {
        toast('Payment Successful!!!')
      }
    },(error)=>{
      toast('Payment UnSuccessful T_T')
    })
  }

  return (
    <div>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => setRazorpayLoaded(true)}
      />
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="grid grid-cols-2 gap-8">
          {/* Monthly Plan */}
          <div className="bg-white p-8 text-center rounded-xl shadow-md w-64 hover:border-emerald-500 hover:border">
            <h3 className="text-xl font-semibold">Monthly</h3>
            <p className="text-emerald-700 text-2xl font-bold">
              ₹299/<span className="text-sm">month</span>
            </p>
            <ul className="text-left mt-4">
              {[
                "Access to All Courses",
                "Free Source Code",
                "Free App Membership",
                "Email & Instagram DM Support",
              ].map((item, index) => (
                <li key={index} className="flex items-center my-2 text-base">
                  <img src="tick.jpeg" alt="Tick" className="w-5 h-5 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 px-6 py-2 text-white bg-emerald-700 rounded-full font-semibold transition hover:bg-emerald-500"
              onClick={() => createSubscription("plan_PqoklKNiEqVduZ")}
            >
              Get Started
            </button>
          </div>

          {/* Yearly Plan */}
          <div className="bg-white p-8 text-center rounded-xl shadow-md w-64 hover:border-emerald-500 hover:border">
            <h3 className="text-xl font-semibold">Yearly</h3>
            <p className="text-emerald-700 text-2xl font-bold">
              ₹2599/<span className="text-sm">month</span>
            </p>
            <ul className="text-left mt-4">
              {[
                "Access to All Courses",
                "Free Source Code",
                "Free App Membership",
                "Email & Instagram DM Support",
              ].map((item, index) => (
                <li key={index} className="flex items-center my-2 text-base">
                  <img src="tick.jpeg" alt="Tick" className="w-5 h-5 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 px-6 py-2 text-white bg-emerald-700 rounded-full font-semibold transition hover:bg-emerald-800"
              onClick={() => createSubscription("plan_Pqok8dvtg3CIxS")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgriallyPro;
