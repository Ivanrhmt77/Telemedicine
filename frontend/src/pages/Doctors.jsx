import React, { useState, useEffect } from 'react';
import DoctorModal from '../components/DoctorModal';
import ScheduleModal from '../components/ScheduleModal';
import AppointmentModal from '../components/AppointmentModal';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [doctorModalOpen, setDoctorModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDoctorSchedules, setSelectedDoctorSchedules] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/dokter');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await fetch(`http://localhost:8000/api/dokter/${id}`, {
          method: 'DELETE',
        });
        fetchDoctors();
      } catch (error) {
        console.error('Error deleting doctor:', error);
      }
    }
  };

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setDoctorModalOpen(true);
  };

  const handleViewSchedule = async (doctor) => {
    try {
      const response = await fetch(`http://localhost:8000/api/jadwalDokter/dokter/${doctor._id}`);
      const schedules = await response.json();
      setSelectedDoctor(doctor);
      setSelectedDoctorSchedules(schedules);
      setScheduleModalOpen(true);
    } catch (error) {
      console.error('Error fetching doctor schedules:', error);
    }
  };

  const handleCreateAppointment = (doctor) => {
    console.log('Selected Doctor:', doctor); // Log the doctor object
    setSelectedDoctor(doctor);
    setAppointmentModalOpen(true);
};

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Doctors</h1>
        <button
          onClick={() => {
            setSelectedDoctor(null);
            setDoctorModalOpen(true);
          }}
          className="font-semibold bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + Add Doctor
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {doctors.map((doctor) => (
              <tr key={doctor._id}>
                <td className="px-6 py-4 whitespace-nowrap">{doctor.nama}</td>
                <td className="px-6 py-4 whitespace-nowrap">{doctor.spesialisasi}</td>
                <td className="px-6 py-4 whitespace-nowrap">{doctor.no_telepon}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-4">
                  <button
                    onClick={() => handleViewSchedule(doctor)}
                    className="border border-gray-400 text-gray-600 font-semibold py-1 px-3 rounded hover:bg-gray-300"
                  >
                    Schedule
                  </button>
                  <button
                    onClick={() => handleCreateAppointment(doctor)}
                    className="text-white font-semibold bg-green-600 py-1 px-3 rounded hover:bg-green-900"
                  >
                    + Appointment
                  </button>
                  <button
                    onClick={() => handleEdit(doctor)}
                    className="text-white font-semibold bg-indigo-600 py-1 px-3 rounded hover:bg-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(doctor._id)}
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

      <DoctorModal
        isOpen={doctorModalOpen}
        onClose={() => setDoctorModalOpen(false)}
        doctor={selectedDoctor}
        onSuccess={() => {
          fetchDoctors();
          setDoctorModalOpen(false);
        }}
      />

      <ScheduleModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        doctor={selectedDoctor}
        schedules={selectedDoctorSchedules}
      />

      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
        doctor={selectedDoctor}
      />
    </div>
  );
};

export default Doctors;