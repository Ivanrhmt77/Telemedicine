import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

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
            <Link
              to="/"
              className={`px-3 py-2 rounded-md ${
                isActive("/") ? "border-b-2 rounded-none border-blue-500" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              to="/patients"
              className={`px-3 py-2 rounded-md ${
                isActive("/patients") ? "border-b-2 rounded-none border-blue-500" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Patients
            </Link>
            <Link
              to="/doctors"
              className={`px-3 py-2 rounded-md ${
                isActive("/doctors") ? "border-b-2 rounded-none border-blue-500" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Doctors
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
