import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to the Telemedicine Application
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-lg text-gray-700 mb-4">
          This application is designed to streamline healthcare management through a digital platform. Admins, as the primary users, are responsible for managing patient and doctor data and scheduling appointments between them. The key features include:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li><strong>Patient and Doctor Data Management:</strong> Admins can add, edit, and delete crucial information to ensure data remains up-to-date.</li>
          <li><strong>Appointment Scheduling:</strong> Efficiently create and update appointment statuses for patients with doctors.</li>
          <li><strong>History and Schedule Management:</strong> Simplify the tracking of patient history and doctor schedules.</li>
        </ul>
        <p className="text-lg text-gray-700 mb-6">
          This application ensures telemedicine processes are fast, secure, and well-organized, bringing patients and doctors closer through digital technology.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/patients"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md"
          >
            Manage Patients
          </Link>
          <Link
            to="/doctors"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md"
          >
            Manage Doctors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
