import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Telemedicine App</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-lg text-gray-700 mb-4">
          Manage your patients and appointments efficiently with our telemedicine platform.
        </p>
        <div className="flex justify-center">
          <Link
            to="/patients"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md"
          >
            View Patients
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;