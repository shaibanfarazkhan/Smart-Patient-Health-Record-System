import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { 
    Activity, Plus, LogOut, Search, Filter, 
    Calendar, User as UserIcon, Hospital, 
    FileText, Zap, Shield, AlertCircle,
    TrendingUp, BarChart3, Clock
} from 'lucide-react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer
} from 'recharts';
import API from '../api';

const PatientDashboard = () => {
    const [records, setRecords] = useState([]);
    const [accessCode, setAccessCode] = useState('');
    const [name, setName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        setName(storedName);
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const response = await API.get('/records');
            setRecords(response.data);
        } catch (err) {
            // Error handled by UI or silently
        }
    };

    const generateCode = async () => {
        try {
            const response = await API.post('/access/generate');
            setAccessCode(response.data.code);
        } catch (err) {
            // Error handled by UI or silently
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    // Prepare data for analytics
    const chartData = useMemo(() => {
        const last6Months = Array.from({ length: 6 }).map((_, i) => {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            return {
                month: d.toLocaleString('default', { month: 'short' }),
                count: 0
            };
        }).reverse();

        records.forEach(record => {
            const recordDate = new Date(record.date);
            const monthName = recordDate.toLocaleString('default', { month: 'short' });
            const monthData = last6Months.find(m => m.month === monthName);
            if (monthData) monthData.count++;
        });

        return last6Months;
    }, [records]);

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
        <div className="min-h-screen bg-[#0a0f18] text-white font-['Outfit',sans-serif] pb-20">
            {/* Background Decorative Blur */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
            </div>

            {/* Navbar */}
            <nav className="relative z-10 border-b border-white/5 bg-[#0d141f]/80 backdrop-blur-md px-8 py-4 flex justify-between items-center sticky top-0">
                <div className="flex items-center gap-2">
                    <Activity size={24} className="text-teal-400" />
                    <span className="text-xl font-bold tracking-tight">MediChain</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-sm font-medium text-white">Hi, {name}</span>
                        <span className="text-[10px] text-teal-500 uppercase tracking-widest font-bold">Patient Portal</span>
                    </div>
                    <button onClick={handleLogout} className="p-2 hover:bg-red-500/10 rounded-full text-gray-400 hover:text-red-500 transition-all">
                        <LogOut size={20} />
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto p-8 relative z-10">
                {/* Stats & Analytics Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Main Analytics Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 bg-white/5 rounded-3xl border border-white/10 p-8 backdrop-blur-md"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-xl font-bold mb-1">Health Trends</h3>
                                <p className="text-sm text-gray-400">Medical checkups over the last 6 months</p>
                            </div>
                            <div className="p-3 bg-teal-500/10 rounded-2xl text-teal-400">
                                <TrendingUp size={24} />
                            </div>
                        </div>
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#111827', border: '1px solid #ffffff10', borderRadius: '12px' }}
                                        itemStyle={{ color: '#2dd4bf' }}
                                    />
                                    <Area type="monotone" dataKey="count" stroke="#2dd4bf" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 gap-4">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white/5 rounded-2xl border border-white/10 p-6 backdrop-blur-md flex items-center gap-4"
                        >
                            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                                <BarChart3 size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Total Records</p>
                                <p className="text-2xl font-bold">{records.length}</p>
                            </div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/5 rounded-2xl border border-white/10 p-6 backdrop-blur-md flex items-center gap-4"
                        >
                            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400">
                                <Clock size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Latest Visit</p>
                                <p className="text-lg font-bold">{records.length > 0 ? records[0].recordType : 'None'}</p>
                            </div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-red-500/5 rounded-2xl border border-red-500/10 p-6 backdrop-blur-md flex items-center gap-4 group cursor-pointer hover:bg-red-500/10 transition-all"
                        >
                            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-400">
                                <AlertCircle size={24} />
                            </div>
                            <Link to={`/emergency/${localStorage.getItem('id')}`} className="flex-1">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Emergency ID</p>
                                <p className="text-sm font-bold text-red-400 group-hover:underline">View Public Profile</p>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Doctor Access Section */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-teal-500/10 to-blue-600/10 rounded-3xl border border-white/5 p-8 mb-12 flex flex-col md:flex-row items-center gap-12 backdrop-blur-xl"
                >
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold mb-4 uppercase tracking-widest">
                            <Shield size={12} />
                            Secure Sharing
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Doctor Access Portal</h2>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                            Share your medical history securely. Generate a one-time code or show the QR for your doctor 
                            to gain instant, temporary access to your health records.
                        </p>
                    </div>
                    
                    <div className="w-full md:w-auto flex flex-col items-center">
                        <AnimatePresence mode='wait'>
                            {accessCode ? (
                                <motion.div 
                                    key="code"
                                    initial={{ opacity: 0, rotateY: 90 }}
                                    animate={{ opacity: 1, rotateY: 0 }}
                                    exit={{ opacity: 0, rotateY: -90 }}
                                    className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center"
                                >
                                    <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl px-8 py-4 mb-6">
                                        <span className="text-4xl font-mono font-bold text-teal-400 tracking-[0.3em]">{accessCode}</span>
                                    </div>
                                    <div className="p-4 bg-white rounded-2xl">
                                        <QRCodeSVG value={`http://localhost:3000/doctor?code=${accessCode}`} size={160} />
                                    </div>
                                    <p className="text-xs text-teal-500 mt-4 font-bold uppercase tracking-widest">Scan to access</p>
                                </motion.div>
                            ) : (
                                <motion.button 
                                    key="button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={generateCode}
                                    className="bg-white text-black px-12 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-white/5 hover:bg-teal-400 transition-colors flex items-center gap-3"
                                >
                                    <Zap size={20} />
                                    Generate Access Code
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Timeline Header */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
                    <h3 className="text-3xl font-bold tracking-tight">Medical Timeline</h3>
                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search diagnoses, doctors..." 
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-teal-500 transition-all text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <select 
                                className="pl-12 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-teal-500 transition-all text-sm appearance-none cursor-pointer"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option className="bg-[#111827]">All</option>
                                <option className="bg-[#111827]">General Checkup</option>
                                <option className="bg-[#111827]">Emergency</option>
                                <option className="bg-[#111827]">Surgery</option>
                                <option className="bg-[#111827]">Lab Report</option>
                                <option className="bg-[#111827]">Vaccination</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                {/* Timeline Feed */}
                <div className="space-y-6">
                    <AnimatePresence>
                        {records
                            .filter(r => 
                                (filterType === 'All' || r.recordType === filterType) &&
                                (r.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                 r.doctorName.toLowerCase().includes(searchTerm.toLowerCase()))
                            )
                            .map((record, idx) => (
                                <motion.div 
                                    key={record._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:bg-white/[0.08] transition-all group backdrop-blur-sm"
                                >
                                    <div className="p-8">
                                        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                                            <div className="flex-1">
                                                <div className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold border bg-gradient-to-r uppercase tracking-widest mb-4 ${getTypeStyles(record.recordType)}`}>
                                                    {record.recordType}
                                                </div>
                                                <h4 className="text-2xl font-bold text-white group-hover:text-teal-400 transition-colors">{record.diagnosis}</h4>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-400 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                                <Calendar size={16} />
                                                <span className="text-sm font-medium">{new Date(record.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                                                    <UserIcon size={12} />
                                                    Attending Doctor
                                                </div>
                                                <p className="text-gray-200 font-semibold">{record.doctorName}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                                                    <Hospital size={12} />
                                                    Medical Facility
                                                </div>
                                                <p className="text-gray-200 font-semibold">{record.hospitalName}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                                                    <FileText size={12} />
                                                    Prescribed Medication
                                                </div>
                                                <p className="text-teal-400 font-bold">{record.prescription}</p>
                                            </div>
                                        </div>

                                        {record.notes && (
                                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-2">Clinical Notes</p>
                                                <p className="text-gray-400 italic text-sm leading-relaxed">{record.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                    </AnimatePresence>

                    {records.length === 0 && (
                        <div className="text-center py-32 bg-white/5 rounded-[40px] border-2 border-dashed border-white/10">
                            <Activity size={48} className="mx-auto text-gray-700 mb-6" />
                            <h3 className="text-xl font-bold text-gray-400">No medical history found</h3>
                            <p className="text-gray-600 mt-2">Start your health journey by adding your first record.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-20">
                <Link 
                    to="/patient/add"
                    className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-600 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-teal-500/40 hover:scale-110 active:scale-95 transition-all group"
                >
                    <Plus size={32} className="group-hover:rotate-90 transition-transform duration-300" />
                </Link>
            </div>
        </div>
    );
};

export default PatientDashboard;
