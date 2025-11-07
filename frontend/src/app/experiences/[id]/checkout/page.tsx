"use client";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import Header from "@/components/Navbar";
import { experiences } from "@/lib/mockExperiences";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, validatePromoCode } from "@/store/slices/bookingSlice";
import { RootState } from "@/store/store";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state: RootState) => state.booking);
  const id = params?.id;
  const date = searchParams?.get("date") || "Dec 1";
  const time = searchParams?.get("time") || "07:00-11:00";
  const quantity = Number(searchParams?.get("quantity") || "1");

  const exp = id ? experiences.find((e) => e.id === id) : undefined;

  const subtotal = exp ? exp.price * quantity : 5000;
  const tax = 59;
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [promoError, setPromoError] = useState("");
  const total = subtotal + tax - discount;

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    // Load user details from localStorage if available
    const savedUser = localStorage.getItem('userDetails');
    if (savedUser) {
      setUserDetails(JSON.parse(savedUser));
    }
  }, []);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    try {
      const result = await dispatch(validatePromoCode({ 
        code: promoCode, 
        amount: subtotal 
      })).unwrap();
      
      if (result.valid) {
        setDiscount(result.discount);
        setAppliedPromo(promoCode);
        setPromoError("");
      } else {
        setPromoError(result.message);
        setDiscount(0);
        setAppliedPromo("");
      }
    } catch (err) {
      setPromoError("Failed to validate promo code");
    }
  };

  const handlePayment = async () => {
    if (!agreed || !userDetails.name || !userDetails.email) return;

    localStorage.setItem('userDetails', JSON.stringify(userDetails));

    const bookingData = {
      experienceId: id,
      experience: {
        id: exp.id,
        title: exp.title,
        price: exp.price,
        image: exp.image
      },
      user: userDetails,
      quantity,
      date,
      time,
      promoCode: appliedPromo || null,
      totalAmount: total
    };

    try {
      const result = await dispatch(createBooking(bookingData)).unwrap();
      
      if (result.bookingId) {
        router.push("/result");
      }
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  if (!exp) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-semibold mb-4">Experience not found</h1>
          <p className="text-gray-600">
            The experience you are trying to book could not be found.
          </p>
        </main>
      </div>
    );
  }

  const isFormValid = agreed && userDetails.name && userDetails.email;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-5xl mx-auto px-6">
          <Link
            href={`/experiences/${id}`}
            className="inline-flex items-center gap-2 px-4 py-3 text-gray-700 hover:text-black text-sm"
          >
            ← Details
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Full Name & Email & Phone */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Full name *
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={userDetails.name}
                    onChange={(e) => setUserDetails(prev => ({
                      ...prev,
                      name: e.target.value
                    }))}
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 text-sm focus:ring-1 focus:ring-black focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={userDetails.email}
                    onChange={(e) => setUserDetails(prev => ({
                      ...prev,
                      email: e.target.value
                    }))}
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 text-sm focus:ring-1 focus:ring-black focus:outline-none"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    value={userDetails.phone}
                    onChange={(e) => setUserDetails(prev => ({
                      ...prev,
                      phone: e.target.value
                    }))}
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 text-sm focus:ring-1 focus:ring-black focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Promo Code */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-xs text-gray-600 mb-4">
                Apply{" "}
                <span className="text-green-600 font-semibold">'SAVE10'</span> for instant
                10% Discount
              </p>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md text-gray-900 text-sm focus:ring-1 focus:ring-black focus:outline-none"
                />
                <button 
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-6 py-3 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800"
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p className="text-red-500 text-sm mt-2">{promoError}</p>
              )}
              {appliedPromo && (
                <p className="text-green-600 text-sm mt-2">
                  Promo code {appliedPromo} applied! Discount: ₹{discount}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 border-gray-300 rounded focus:ring-1 focus:ring-black"
                />
                <label htmlFor="agree" className="text-sm text-gray-700 cursor-pointer select-none">
                  I agree to the terms and safety policy
                </label>
              </div>
            </div>
          </div>

          {/* Right Section (Order Summary) */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 shadow-sm sticky top-24">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="text-gray-900 font-medium text-right">
                    {exp.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="text-gray-900">{date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="text-gray-900">{time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity</span>
                  <span className="text-gray-900">{quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span className="text-gray-900">₹{tax.toFixed(2)}</span>
                </div>
              </div>

              <hr className="my-4 border-gray-300" />

              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-600">Total</span>
                <span className="text-lg font-semibold text-gray-900">
                  ₹{total.toFixed(2)}
                </span>
              </div>

              {error && (
                <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
              )}

              <button
                onClick={handlePayment}
                disabled={loading || !isFormValid}
                className={`w-full py-3 rounded-md text-sm font-semibold transition ${
                  !isFormValid
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : loading
                    ? "bg-gray-400 cursor-wait"
                    : "bg-[#FFD740] hover:bg-[#FBC02D] text-black"
                }`}
              >
                {loading
                  ? "Processing..."
                  : !isFormValid
                  ? "Please Fill Required Fields"
                  : "Pay and Confirm"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}