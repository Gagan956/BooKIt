// backend/src/seed/seed.js
const mongoose = require('mongoose');
const Experience = require('../models/Experience');
require('dotenv').config();

const experiences = [
  {
    title: "Snow Trek to Solang Valley",
    description: "A thrilling snow trek through the Garland Himalayas with breathtaking views.",
    price: 5999,
    location: "Manali",
    image: "/images/Manali.jpg",
    duration: "6-7 hours",
    difficulty: "Moderate",
    rating: 4.8,
    reviews: 124,
    includes: ["Professional guide", "Trekking equipment", "Lunch", "Transportation"],
    requirements: ["Good physical fitness", "Warm clothing", "Trekking shoes"]
  },
  {
    title: "Tea Estate Trail",
    description: "Walks through the lush green tea gardens of Munnar and witness the art of tea making.",
    price: 2800,
    location: "Munnar",
    image: "/images/Munnar.jpg",
    duration: "3-4 hours",
    difficulty: "Easy",
    rating: 4.6,
    reviews: 89,
    includes: ["Tea tasting", "Garden tour", "English speaking guide"],
    requirements: ["Comfortable walking shoes"]
  },
  {
    title: "Sundarbans Wildlife Safari",
    description: "Explore the world's largest mangrove forest and spot the majestic Royal Bengal Tiger.",
    price: 4800,
    location: "Sundarbans",
    image: "/images/Sundarbans.jpg",
    duration: "Full day",
    difficulty: "Moderate",
    rating: 4.7,
    reviews: 156,
    includes: ["Boat safari", "Forest guide", "Lunch", "Permits"],
    requirements: ["Binoculars", "Camera", "Comfortable clothing"]
  },
  {
    title: "Rappelling at Panchgani Cliffs",
    description: "An adrenaline-pumping rappelling experience down the scenic cliffs of Panchgani.",
    price: 1800,
    location: "Panchgani",
    image: "/images/Panchgani.jpg",
    duration: "2-3 hours",
    difficulty: "Moderate",
    rating: 4.5,
    reviews: 203,
    includes: ["Safety equipment", "Professional instructor", "Photos"],
    requirements: ["Comfortable clothing", "No fear of heights"]
  },
  {
    title: "Paragliding at Bir Billing",
    description: "Soar through the skies at the world's second highest paragliding spot.",
    price: 3500,
    location: "Bir Billing",
    image: "/images/Bir.jpg",
    duration: "30 minutes flight",
    difficulty: "Easy",
    rating: 4.9,
    reviews: 312,
    includes: ["Equipment", "Instructor", "Insurance", "Certificate"],
    requirements: ["Weight between 40-100 kg", "Comfortable clothing"]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookit');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Experience.deleteMany({});
    console.log('Cleared existing experiences');

    // Insert new data
    await Experience.insertMany(experiences);
    console.log('Database seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();