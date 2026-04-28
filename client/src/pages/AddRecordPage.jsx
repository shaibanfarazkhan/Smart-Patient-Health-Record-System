import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Activity, ArrowLeft, Calendar, User, 
    Hospital, ClipboardList, Pill, BookOpen, 
    CheckCircle2, AlertCircle 
} from 'lucide-react';
import API from '../api';

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
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await API.post('/records', formData);
            navigate('/patient');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to add record. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-teal-500 transition-all text-white placeholder:text-gray-600";
    const labelClasses = "block text-xs font-bold text-gray-500 mb-2 uppercase tracking-[0.2em] ml-1";

    return (
        <div className="min-h-screen bg-[#0a0f18] text-white font-['Outfit',sans-serif] p-6 relative overflow-hidden">
            {/* Background Decorative Blur */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-3xl mx-auto relative z-10 pt-10">
                <button 
                    onClick={() => navigate('/patient')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-10 transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Timeline
                </button>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 rounded-[40px] border border-white/10 overflow-hidden backdrop-blur-xl shadow-2xl"
                >
                    <div className="bg-gradient-to-r from-teal-500/20 to-blue-600/20 p-10 border-b border-white/5">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400">
                                <ClipboardList size={28} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight">Add New Entry</h2>
                                <p className="text-gray-400 text-sm">Expand your medical history with detailed information</p>
                            </div>
                        </div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-10 space-y-8">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-sm flex items-center gap-3">
                                <AlertCircle size={18} />
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className={labelClasses}>Consultation Date</label>
                                <div className="relative group">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" size={20} />
                                    <input
                                        type="date"
                                        required
                                        className={inputClasses}
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className={labelClasses}>Record Category</label>
                                <div className="relative group">
                                    <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" size={20} />
                                    <select
                                        className={`${inputClasses} appearance-none cursor-pointer`}
                                        value={formData.recordType}
                                        onChange={(e) => setFormData({ ...formData, recordType: e.target.value })}
                                    >
                                        <option className="bg-[#111827]">General Checkup</option>
                                        <option className="bg-[#111827]">Emergency</option>
                                        <option className="bg-[#111827]">Surgery</option>
                                        <option className="bg-[#111827]">Lab Report</option>
                                        <option className="bg-[#111827]">Vaccination</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className={labelClasses}>Attending Doctor</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" size={20} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Dr. Alexander Smith"
                                        className={inputClasses}
                                        value={formData.doctorName}
                                        onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className={labelClasses}>Medical Facility</label>
                                <div className="relative group">
                                    <Hospital className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" size={20} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="St. Johns General Hospital"
                                        className={inputClasses}
                                        value={formData.hospitalName}
                                        onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className={labelClasses}>Primary Diagnosis</label>
                            <div className="relative group">
                                <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" size={20} />
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter diagnosis or purpose of visit"
                                    className={inputClasses}
                                    value={formData.diagnosis}
                                    onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className={labelClasses}>Prescribed Medication</label>
                            <div className="relative group">
                                <Pill className="absolute left-4 top-5 text-gray-500 group-focus-within:text-teal-400 transition-colors" size={20} />
                                <textarea
                                    rows="2"
                                    required
                                    placeholder="List prescribed medicines and dosage..."
                                    className={`${inputClasses} pl-12 min-h-[100px]`}
                                    value={formData.prescription}
                                    onChange={(e) => setFormData({ ...formData, prescription: e.target.value })}
                                ></textarea>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className={labelClasses}>Clinical Notes</label>
                            <div className="relative group">
                                <BookOpen className="absolute left-4 top-5 text-gray-500 group-focus-within:text-teal-400 transition-colors" size={20} />
                                <textarea
                                    rows="3"
                                    placeholder="Any additional observations or recovery notes..."
                                    className={`${inputClasses} pl-12 min-h-[120px]`}
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex gap-6 pt-6">
                            <button
                                type="button"
                                onClick={() => navigate('/patient')}
                                className="flex-1 bg-white/5 text-gray-400 p-5 rounded-2xl font-bold hover:bg-white/10 transition-all border border-white/5"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-teal-500 to-blue-600 text-white p-5 rounded-2xl font-bold hover:scale-[1.02] transition-all shadow-xl shadow-teal-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : (
                                    <>
                                        <CheckCircle2 size={22} />
                                        Save Record
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default AddRecordPage;
