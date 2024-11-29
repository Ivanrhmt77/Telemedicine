import React, { useState, useEffect } from 'react';

const AppointmentModal = ({ isOpen, onClose, doctor }) => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    pasien: '',
    dokter: doctor ? doctor._id : '', // Ensure this is correctly setting the doctor ID
    tanggal_appointment: '',
    waktu_mulai: '',
    waktu_selesai: '',
    status: 'pending'
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [doctorSchedules, setDoctorSchedules] = useState([]);

  // Fetch patients and doctor schedules when modal is open
  useEffect(() => {
    if (isOpen) {
      fetchPatients();
      if (doctor) {
        fetchDoctorSchedules();
      }
    }
  }, [isOpen, doctor]);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/pasien'); // Endpoint pasien
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      setErrorMessage('Failed to fetch patients. Please try again.');
    }
  };

  const fetchDoctorSchedules = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/jadwalDokter/dokter/${doctor._id}`); // Jadwal dokter
      const schedules = await response.json();
      setDoctorSchedules(schedules);
    } catch (error) {
      setErrorMessage('Failed to fetch doctor schedules. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Add console logs to check the data
    console.log('Form Data:', formData);
    console.log('Doctor:', doctor);

    try {
        const response = await fetch('http://localhost:8000/api/appointment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                dokter: doctor ? doctor._id : '' // Explicitly pass doctor ID
            }),
        });

        console.log('Response:', response);

        if (response.ok) {
            const result = await response.json();
            console.log('Appointment created:', result);
            setSuccessMessage('Appointment berhasil dibuat!');
            onClose();
        } else {
            const errorData = await response.json();
            console.error('Error response:', errorData);
            setErrorMessage(errorData.message || 'Gagal membuat appointment');
        }
    } catch (error) {
        console.error('Submission error:', error);
        setErrorMessage('Terjadi kesalahan saat membuat appointment');
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Create Appointment</h2>
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          {/* Select Patient */}
          <div className="mb-4">
            <label htmlFor="pasien" className="block text-sm font-medium text-gray-700">
              Patient
            </label>
            <select
              id="pasien"
              name="pasien"
              value={formData.pasien}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-300 p-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">-- Select Patient --</option>
              {patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.nama}
                </option>
              ))}
            </select>
          </div>

          {/* Date Input */}
          <div className="mb-4">
            <label htmlFor="tanggal_appointment" className="block text-sm font-medium text-gray-700">
              Appointment Date
            </label>
            <input
              type="date"
              id="tanggal_appointment"
              name="tanggal_appointment"
              value={formData.tanggal_appointment}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-300 p-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Time Start */}
          <div className="mb-4">
            <label htmlFor="waktu_mulai" className="block text-sm font-medium text-gray-700">
              Start Time
            </label>
            <input
              type="time"
              id="waktu_mulai"
              name="waktu_mulai"
              value={formData.waktu_mulai}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-300 p-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Time End */}
          <div className="mb-4">
            <label htmlFor="waktu_selesai" className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <input
              type="time"
              id="waktu_selesai"
              name="waktu_selesai"
              value={formData.waktu_selesai}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-300 p-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-400 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md"
            >
              Creater Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
