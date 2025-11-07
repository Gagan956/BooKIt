"use client";

import Link from "next/link";
import Header from "@/components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { useEffect } from "react";
import { resetBookingState } from "@/store/slices/bookingSlice";

export default function BookingResult() {
  const dispatch = useDispatch();
  const { confirmation, error } = useSelector((s: RootState) => s.booking);
  
  useEffect(() => {
    console.log('📊 Booking result page - Confirmation:', confirmation);
    console.log('📊 Booking result page - Error:', error);
    
    localStorage.removeItem('userDetails');
    
    // Reset booking state when leaving the page
    return () => {
      setTimeout(() => {
        dispatch(resetBookingState());
      }, 5000); 
    };
  }, [dispatch]);

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-start pt-20">
          <div className="text-center max-w-md mx-6">
            {/* Error Icon */}
            <div className="bg-red-500 rounded-full w-20 h-20 flex items-center justify-center mb-6 mx-auto">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            {/* Error Text */}
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Booking Failed
            </h1>
            
            <p className="text-gray-700 text-base mb-4">
              We encountered an issue while processing your booking.
            </p>

            <div className="bg-red-50 border border-red-200 p-4 rounded-lg w-full mb-6">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => window.history.back()}
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="bg-[#FFD740] hover:bg-[#FBC02D] text-black px-6 py-3 rounded-md font-medium transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!confirmation) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-start pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              No Booking Found
            </h1>
            <p className="text-gray-600 mb-6">
              Please complete a booking first to see the confirmation details.
            </p>
            <Link
              href="/"
              className="bg-[#FFD740] hover:bg-[#FBC02D] text-black px-5 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Browse Experiences
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-start pt-20">
        <div className="flex flex-col items-center text-center max-w-md mx-6">
          {/* Success Icon */}
          <div className="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Success Text */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          
          <p className="text-gray-700 text-base mb-4">
            Thank you, <strong>{confirmation.userDetails?.name}</strong>! Your adventure has been confirmed.
          </p>

          {/* Booking Details */}
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg w-full mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h2>
            <div className="space-y-3 text-sm text-left">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Reference ID:</span>
                <span className="font-medium text-gray-800">
                  {confirmation.refId}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="text-gray-800">{confirmation.bookingDetails?.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="text-gray-800">{confirmation.bookingDetails?.time}</span>
              </div>
              
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-base">
                  <span className="text-gray-900 font-semibold">Total Paid:</span>
                  <span className="font-bold text-gray-900">
                    ₹{confirmation.bookingDetails?.totalAmount?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4">
            A confirmation email has been sent to <strong>{confirmation.userDetails?.email}</strong>
          </p>

          {confirmation.message && (
            <p className="text-green-600 text-sm mb-4 bg-green-50 px-3 py-2 rounded">
              ✅ {confirmation.message}
            </p>
          )}

          <p className="text-gray-500 text-xs mb-6">
            Please keep your reference ID handy for any inquiries. Our team will contact you shortly with further details.
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href="/"
              className="bg-[#FFD740] hover:bg-[#FBC02D] text-black px-6 py-3 rounded-md font-medium transition-colors"
            >
              Book Another Adventure
            </Link>
            <button
              onClick={() => window.print()}
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Print Details
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}