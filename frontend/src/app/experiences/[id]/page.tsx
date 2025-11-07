"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchExperienceById } from "@/store/slices/experiencesSlice";
import type { RootState, AppDispatch } from "@/store/store";
import { experiences as mockExperiences } from "@/lib/mockExperiences";
import Navbar from "@/components/Navbar";

type Props = {
  params: any;
};

export default function ExperiencePage(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { selected } = useSelector((s: RootState) => s.experiences);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [routeId, setRouteId] = useState<string | null>(null);
  const [imageHeight, setImageHeight] = useState<number>(420);

  const rightSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const p = props.params;
        const resolved = typeof p?.then === "function" ? await p : p;
        if (mounted) setRouteId(resolved?.id ?? null);
      } catch {
        if (mounted) setRouteId(null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [props.params]);

  const mockExperience = routeId
    ? mockExperiences.find((e) => e.id === routeId)
    : undefined;

  useEffect(() => {
    if (routeId) dispatch(fetchExperienceById(routeId));
  }, [dispatch, routeId]);

  const experience = selected || mockExperience;

  useEffect(() => {
    const updateHeight = () => {
      if (rightSectionRef.current) {
        const rightHeight = rightSectionRef.current.offsetHeight;
        setImageHeight(Math.max(350, Math.min(rightHeight - 60, 520)));
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  if (!experience) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="flex flex-col items-center justify-center h-[80vh]">
          <h1 className="text-2xl font-semibold mb-4">Experience not found</h1>
          <p className="text-gray-500">
            The experience you are trying to view could not be found.
          </p>
        </main>
      </div>
    );
  }

  const subtotal = experience.price * quantity;
  const tax = 59;
  const total = subtotal + tax;

  const availableDates = ["Dec 1", "Dec 2", "Dec 3", "Dec 4", "Dec 5"];
  const timeSlots = ["07:00-11:00", "10:00-02:00", "03:00-07:00"];
  const isConfirmEnabled = !!(selectedDate && selectedTime);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Back link */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <Link
          href="/"
          className="inline-block px-6 py-4 text-gray-600 hover:text-gray-900"
        >
          ← Details
        </Link>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
        {/*  Left Section */}
        <div>
          {/* Image */}
          <div
            className="relative w-full rounded-xl overflow-hidden shadow-md mb-6"
            style={{
              height: `${imageHeight}px`,
              transition: "height 0.3s ease",
            }}
          >
            <Image
              src={experience.image}
              alt={experience.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-2xl text-gray-800 font-semibold mb-2">
            {experience.title}
          </h1>
          <p className="text-gray-600 mb-6">{experience.description}</p>

          {/* Choose Date */}
          <div className="mb-6">
            <h3 className="text-base text-gray-700 font-medium mb-3">
              Choose Date
            </h3>
            <div className="flex flex-wrap gap-2">
              {availableDates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-4 py-2 rounded border text-sm transition ${
                    selectedDate === date
                      ? "bg-[#FFD740] text-black border-transparent"
                      : "border-gray-300 hover:border-[#FFD740] text-gray-700"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          {/* Choose Time */}
          <div className="mb-6">
            <h3 className="text-base text-gray-700 font-medium mb-3">
              Choose Time
            </h3>
            <div className="flex gap-2 flex-wrap">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`px-4 py-2 rounded border text-sm transition ${
                    selectedTime === slot
                      ? "bg-[#FFD740] text-black border-transparent"
                      : "border-gray-300 hover:border-[#FFD740] text-gray-700"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              All times are in IST (GMT +5:30)
            </div>
          </div>

          {/* About */}
          <div className="mt-8">
            <h3 className="text-lg text-gray-700 font-medium mb-3">About</h3>
            <p className="text-gray-600 bg-gray-100 leading-relaxed rounded-md p-3">
              Enjoy snow activities, local Himachali cuisine, and cozy bonfires
              during your stay.
            </p>
          </div>
        </div>

        {/*  Right Section */}
        <div ref={rightSectionRef}>
          <div className="bg-gray-100 p-6 rounded-xl border border-gray-200 shadow-md top-24">
            <div className="space-y-4">
              <div className="flex justify-between text-gray-700">
                <span>Starts at</span>
                <span className="font-medium">₹{experience.price}</span>
              </div>

              {/* Quantity */}
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Quantity</span>
                <div className="flex items-center gap-3 text-gray-800">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center border rounded hover:border-[#FFD740] disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-4 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center border rounded hover:border-[#FFD740]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Taxes</span>
                <span className="font-medium">₹{tax}</span>
              </div>

              <div className="border-t pt-4 flex justify-between text-gray-900 font-semibold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              {/* Confirm Button */}
              {isConfirmEnabled ? (
                <Link
                  href={`/experiences/${routeId}/checkout?date=${selectedDate}&time=${selectedTime}&quantity=${quantity}`}
                  className="block w-full mt-4 py-2.5 bg-[#FFD740] hover:bg-[#FBC02D] text-black text-center font-medium rounded-md transition"
                >
                  Confirm
                </Link>
              ) : (
                <button
                  disabled
                  className="block w-full mt-4 py-2.5 bg-gray-300 text-gray-600 text-center font-medium rounded-md cursor-not-allowed"
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
