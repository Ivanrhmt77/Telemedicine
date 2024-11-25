import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Telemedicine App
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Home
            </Link>
            <Link to="/patients" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Patients
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;