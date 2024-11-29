import React, { useState, useEffect } from 'react';

const PatientModal = ({ isOpen, onClose, patient, onSuccess }) => {
  const [formData, setFormData] = useState({
    nama: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    alamat: '',
    no_telepon: '',
    email: '',
    riwayat_penyakit: '',
    tinggi_badan: '',
    berat_badan: ''
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        ...patient,
        tanggal_lahir: new Date(patient.tanggal_lahir).toISOString().split('T')[0]
      });
    } else {
      setFormData({
        nama: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        alamat: '',
        no_telepon: '',
        email: '',
        riwayat_penyakit: '',
        tinggi_badan: '',
        berat_badan: ''
      });
    }
  }, [patient]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = patient
        ? `http://localhost:8000/api/pasien/${patient._id}`
        : 'http://localhost:8000/api/pasien';
      const method = patient ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">
          {patient ? 'Edit Patient' : 'Add Patient'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-300 p-1 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Birth Date</label>
            <input
              type="date"
              value={formData.tanggal_lahir}
              onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-300 p-1 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              value={formData.jenis_kelamin}
              onChange={(e) => setFormData({ ...formData, jenis_kelamin: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-300 p-1 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select gender</option>
              <option value="Laki-laki">Male</option>
              <option value="Perempuan">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              value={formData.alamat}
              onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-300 p-1 h-20 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={formData.no_telepon}
              onChange={(e) => setFormData({ ...formData, no_telepon: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-300 p-1 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-300 p-1 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Medical History</label>
            <textarea
              value={formData.riwayat_penyakit}
              onChange={(e) => setFormData({ ...formData, riwayat_penyakit: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-300 p-1 h-20 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
              <input
                type="number"
                value={formData.tinggi_badan}
                onChange={(e) => setFormData({ ...formData, tinggi_badan: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-300 p-1 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
              <input
                type="number"
                value={formData.berat_badan}
                onChange={(e) => setFormData({ ...formData, berat_badan: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-300 p-1 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border-gray-400 hover:bg-gray-200 rounded-md border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientModal;