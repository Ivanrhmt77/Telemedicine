import React, { useState } from 'react';

const ScheduleModal = ({ isOpen, onClose, doctor, schedules }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">
          Doctor Schedule for {doctor.nama}
        </h2>
        
        {schedules.length === 0 ? (
          <p className="text-gray-500">No schedules found for this doctor.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Date</th>
                <th className="border p-2 text-left">Start Time</th>
                <th className="border p-2 text-left">End Time</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => (
                <tr key={schedule._id}>
                  <td className="border p-2">
                    {new Date(schedule.tanggal).toLocaleDateString()}
                  </td>
                  <td className="border p-2">{schedule.waktu_mulai}</td>
                  <td className="border p-2">{schedule.waktu_selesai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;