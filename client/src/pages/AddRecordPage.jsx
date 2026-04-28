import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRecordPage = () => {
    const [formData, setFormData] = useState({
        date: '',
        doctorName: '',
        hospitalName: '',
        diagnosis: '',
        prescription: '',
        notes: '',
        recordType: 'General Checkup'
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/records', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/patient');
        } catch (err) {
            console.error('Failed to add record');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-teal-600 p-6 text-white text-center">
                    <h2 className="text-2xl font-bold">Add New Medical Record</h2>
                    <p className="opacity-80">Add details about your recent checkup or procedure</p>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">Date</label>
                            <input
                                type="date"
                                required
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">Record Type</label>
                            <select
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                                value={formData.recordType}
                                onChange={(e) => setFormData({ ...formData, recordType: e.target.value })}
                            >
                                <option>General Checkup</option>
                                <option>Emergency</option>
                                <option>Surgery</option>
                                <option>Lab Report</option>
                                <option>Vaccination</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">Doctor Name</label>
                            <input
                                type="text"
                                required
                                placeholder="Dr. Smith"
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                                value={formData.doctorName}
                                onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">Hospital/Clinic</label>
                            <input
                                type="text"
                                required
                                placeholder="City Hospital"
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                                value={formData.hospitalName}
                                onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">Diagnosis</label>
                        <input
                            type="text"
                            required
                            placeholder="What was the checkup for?"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                            value={formData.diagnosis}
                            onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">Prescription/Medicines</label>
                        <textarea
                            rows="2"
                            required
                            placeholder="List medicines and dosage..."
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                            value={formData.prescription}
                            onChange={(e) => setFormData({ ...formData, prescription: e.target.value })}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">Additional Notes</label>
                        <textarea
                            rows="3"
                            placeholder="Any other details..."
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate('/patient')}
                            className="flex-1 bg-gray-100 text-gray-600 p-4 rounded-xl font-bold hover:bg-gray-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-teal-600 text-white p-4 rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-100"
                        >
                            Save Record
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRecordPage;
