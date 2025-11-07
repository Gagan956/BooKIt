"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setSearchQuery,
  fetchExperiences,
} from "@/store/slices/experiencesSlice";
import type { AppDispatch } from "@/store/store";

export default function Header() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(setSearchQuery(query));
      dispatch(fetchExperiences(query)); // ✅ Trigger API call
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    dispatch(setSearchQuery(value));
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 bg-white z-40 shadow-md"
      style={{
        backdropFilter: "saturate(180%) blur(4px)",
        height: "var(--header-height)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full">
        <div className="flex items-center h-full">
          {/* ✅ Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-[90px] h-[90px]">
              <Image
                src="/images/logo.png"
                alt="logo"
                fill
                priority
                className="object-contain drop-shadow-md"
                sizes="(max-width: 768px) 60px, 90px"
              />
            </div>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* ✅ Search Bar */}
          <form
            onSubmit={handleSearch}
            className="relative w-2/5 max-w-[560px] mr-6"
          >
            <input
              type="text"
              placeholder="Search experiences"
              value={query}
              onChange={handleInputChange}
              className="w-full px-5 py-2.5 bg-gray-100 border border-gray-200 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
              style={{ height: 44 }}
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-md text-sm font-medium shadow transition-all"
            >
              Search
            </button>
          </form>

          {/* Space for right icons (optional) */}
          <div className="w-6" />
        </div>
      </div>
    </header>
  );
}
