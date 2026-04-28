import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Activity, Shield, Search, LogOut, 
    Calendar, User, Hospital, FileText, 
    Lock, ArrowRight
} from 'lucide-react';
import API from '../api';

const DoctorDashboard = () => {
    const [code, setCode] = useState('');
    const [records, setRecords] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const urlCode = params.get('code');
        if (urlCode) {
            setCode(urlCode);
            verifyCode(urlCode);
        }
    }, [location]);

    const verifyCode = async (codeToVerify) => {
        setError('');
        setLoading(true);
        try {
            const response = await API.post('/access/verify', { code: codeToVerify });
            setRecords(response.data);
            if (response.data.length === 0) {
                setError('No medical records found for this patient ID.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Access code invalid or expired. Please request a new one.');
            setRecords([]);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = (e) => {
        e.preventDefault();
        verifyCode(code);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const getTypeStyles = (type) => {
        switch (type) {
            case 'General Checkup': return 'from-blue-500/20 to-blue-600/20 text-blue-400 border-blue-500/30';
            case 'Emergency': return 'from-red-500/20 to-red-600/20 text-red-400 border-red-500/30';
            case 'Surgery': return 'from-orange-500/20 to-orange-600/20 text-orange-400 border-orange-500/30';
            case 'Lab Report': return 'from-purple-500/20 to-purple-600/20 text-purple-400 border-purple-500/30';
            case 'Vaccination': return 'from-green-500/20 to-green-600/20 text-green-400 border-green-500/30';
            default: return 'from-gray-500/20 to-gray-600/20 text-gray-400 border-gray-500/30';
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f18] text-white font-['Outfit',sans-serif] pb-20 relative overflow-hidden">
            {/* Background Decorative Blur */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-500/5 blur-[120px] rounded-full" />
            </div>

            {/* Navbar */}
            <nav className="relative z-10 border-b border-white/5 bg-[#0d141f]/80 backdrop-blur-md px-8 py-4 flex justify-between items-center sticky top-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Activity size={20} className="text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">MediChain <span className="text-xs text-blue-400 ml-2 font-bold uppercase tracking-widest px-2 py-0.5 bg-blue-500/10 rounded">Doctor Portal</span></span>
                </div>
                <button onClick={handleLogout} className="p-2 hover:bg-red-500/10 rounded-full text-gray-400 hover:text-red-500 transition-all">
                    <LogOut size={20} />
                </button>
            </nav>

            <div className="max-w-5xl mx-auto p-8 relative z-10">
                {/* Access Code Form */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/5 p-12 rounded-[40px] border border-white/10 mb-16 text-center backdrop-blur-xl shadow-2xl relative"
                >
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                        <Lock size={12} />
                        Verified Medical Access
                    </div>
                    
                    <h2 className="text-4xl font-bold mb-4 mt-4">Patient Record Retrieval</h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                        Securely access clinical history by entering the 6-digit synchronization code provided by the patient. 
                        Access is temporary and audit-logged.
                    </p>
                    
                    <form onSubmit={handleVerify} className="max-w-md mx-auto flex flex-col sm:row gap-4 items-center">
                        <div className="relative w-full">
                            <input
                                type="text"
                                required
                                maxLength="6"
                                placeholder="Enter 6-Digit Code"
                                className="w-full p-5 bg-white/5 border-2 border-white/10 rounded-2xl outline-none focus:border-blue-500 text-center text-3xl font-mono font-bold tracking-[0.3em] transition-all text-white placeholder:text-gray-700 placeholder:text-xl placeholder:tracking-normal"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-3 whitespace-nowrap"
                        >
                            {loading ? 'Authenticating...' : (
                                <>
                                    <Search size={20} />
                                    Retrieve Records
                                </>
                            )}
                        </button>
                    </form>
                    
                    <AnimatePresence>
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-red-400 mt-6 font-medium flex items-center justify-center gap-2"
                            >
                                <Lock size={16} />
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Patient Records Display */}
                <AnimatePresence>
                    {records.length > 0 && (
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-3xl font-bold tracking-tight">Patient Clinical Timeline</h3>
                                <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 text-sm font-bold flex items-center gap-2">
                                    <Activity size={16} />
                                    {records.length} Records Decrypted
                                </div>
                            </div>
                            
                            <div className="space-y-8 relative">
                                {/* Vertical Timeline Line */}
                                <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-white/10 to-transparent hidden md:block" />
                                
                                {records.map((record, idx) => (
                                    <motion.div 
                                        key={record._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="relative pl-0 md:pl-20 group"
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute left-7.5 top-10 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-500/20 hidden md:block group-hover:scale-150 transition-transform" />
                                        
                                        <div className="bg-white/5 rounded-[32px] border border-white/10 overflow-hidden hover:bg-white/[0.08] transition-all backdrop-blur-sm">
                                            <div className="p-8">
                                                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                                                    <div className="flex-1">
                                                        <div className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold border bg-gradient-to-r uppercase tracking-widest mb-4 ${getTypeStyles(record.recordType)}`}>
                                                            {record.recordType}
                                                        </div>
                                                        <h4 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{record.diagnosis}</h4>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-400 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                                        <Calendar size={16} />
                                                        <span className="text-sm font-medium">{new Date(record.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                                                            <User size={12} />
                                                            Physician
                                                        </div>
                                                        <p className="text-gray-200 font-semibold">{record.doctorName}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                                                            <Hospital size={12} />
                                                            Facility
                                                        </div>
                                                        <p className="text-gray-200 font-semibold">{record.hospitalName}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                                                            <FileText size={12} />
                                                            Prescription
                                                        </div>
                                                        <p className="text-blue-400 font-bold">{record.prescription}</p>
                                                    </div>
                                                </div>

                                                {record.notes && (
                                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                                        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-2">Clinical Observation</p>
                                                        <p className="text-gray-400 italic text-sm leading-relaxed">{record.notes}</p>
                                                    </div>
                                                )}
                                                
                                                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                        <Shield size={12} />
                                                        <span>Integrity Hash Verified: {record.hash?.substring(0, 16)}...</span>
                                                    </div>
                                                    <button className="text-blue-400 hover:text-white transition-colors text-sm font-bold flex items-center gap-2">
                                                        Add Addendum
                                                        <ArrowRight size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DoctorDashboard;
