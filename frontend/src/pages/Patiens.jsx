import React, { useState, useEffect } from 'react';
import PatientModal from '../components/PatientModal';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/pasien');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await fetch(`http://localhost:8000/api/pasien/${id}`, {
          method: 'DELETE',
        });
        fetchPatients();
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    }
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Patients</h1>
        <button
          onClick={() => {
            setSelectedPatient(null);
            setIsModalOpen(true);
          }}
          className="font-semibold bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + Add Patient
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Birth Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient._id}>
                <td className="px-6 py-4 whitespace-nowrap">{patient.nama}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(patient.tanggal_lahir).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.jenis_kelamin}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.no_telepon}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(patient)}
                    className="text-white font-semibold bg-indigo-600 py-1 px-3 rounded hover:bg-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(patient._id)}
                    className="text-white font-semibold bg-red-600 py-1 px-3 rounded hover:bg-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        patient={selectedPatient}
        onSuccess={() => {
          fetchPatients();
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default Patients;