import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

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
            // We can't call handleVerify directly here because it expects an event
            // Let's refactor verification into a separate function
            verifyCode(urlCode);
        }
    }, [location]);

    const verifyCode = async (codeToVerify) => {
        setError('');
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/access/verify', { code: codeToVerify });
            setRecords(response.data);
            if (response.data.length === 0) {
                setError('No records found for this patient.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid or expired code');
            setRecords([]);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        verifyCode(code);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'General Checkup': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Emergency': return 'bg-red-100 text-red-700 border-red-200';
            case 'Surgery': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'Lab Report': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'Vaccination': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-teal-600">MediChain <span className="text-sm font-medium text-gray-400">| Doctor Portal</span></h1>
                <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 font-medium">Logout</button>
            </nav>

            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-200 mb-12 text-center">
                    <h2 className="text-3xl font-bold text-secondary mb-4">Patient Record Access</h2>
                    <p className="text-gray-600 mb-8">Enter the 6-digit access code provided by the patient to view their medical history.</p>
                    
                    <form onSubmit={handleVerify} className="max-w-md mx-auto flex gap-4">
                        <input
                            type="text"
                            required
                            maxLength="6"
                            placeholder="Enter Code (e.g. 123456)"
                            className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 outline-none text-center text-2xl font-mono tracking-widest"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <button 
                            type="submit"
                            disabled={loading}
                            className="bg-secondary text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg disabled:opacity-50"
                        >
                            {loading ? 'Verifying...' : 'View Records'}
                        </button>
                    </form>
                    {error && <p className="text-red-500 mt-4 font-medium">{error}</p>}
                </div>

                {records.length > 0 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-2xl font-bold text-secondary mb-6 px-2">Patient Medical Timeline</h3>
                        <div className="space-y-6">
                            {records.map((record) => (
                                <div key={record._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getTypeColor(record.recordType)}`}>
                                                    {record.recordType}
                                                </span>
                                                <h4 className="text-xl font-bold text-gray-900 mt-2">{record.diagnosis}</h4>
                                            </div>
                                            <p className="text-gray-500 font-medium">{new Date(record.date).toLocaleDateString()}</p>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Treating Doctor</p>
                                                <p className="text-gray-700">{record.doctorName}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Facility</p>
                                                <p className="text-gray-700">{record.hospitalName}</p>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Prescription</p>
                                            <p className="text-teal-700 font-medium">{record.prescription}</p>
                                        </div>

                                        {record.notes && (
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Clinical Notes</p>
                                                <p className="text-gray-600 italic">{record.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorDashboard;
