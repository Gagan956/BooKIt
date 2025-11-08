"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type Experience = {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string; 
  description?: string;
};

export default function ExperienceCard({ exp }: { exp: Experience }) {
  const [imageError, setImageError] = useState(false);

  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/')) return imagePath;
    return `/images/${imagePath}`;
  };

  const imageUrl = getImageUrl(exp.image);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-52 w-full">
        {!imageError ? (
          <Image
            src={imageUrl}
            alt={exp.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Image not available</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-base font-semibold text-gray-900 truncate">
            {exp.title}
          </h3>
          <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded whitespace-nowrap">
            {exp.location}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {exp.description || "Experience the adventure of a lifetime."}
        </p>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-800">
            From <span className="font-semibold text-black">₹{exp.price}</span>
          </p>

          <Link
            href={`/experiences/${exp.id}`}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}