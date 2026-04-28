import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

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
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/records', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRecords(response.data);
        } catch (err) {
            console.error('Failed to fetch records');
        }
    };

    const generateCode = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/access/generate', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAccessCode(response.data.code);
        } catch (err) {
            console.error('Failed to generate code');
        }
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
                <h1 className="text-2xl font-bold text-teal-600">MediChain</h1>
                <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-700">Hi, {name}</span>
                    <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 font-medium">Logout</button>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-xl">📊</div>
                        <div>
                            <p className="text-sm text-gray-500">Total Records</p>
                            <p className="text-2xl font-bold text-gray-900">{records.length}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 text-xl">🏥</div>
                        <div>
                            <p className="text-sm text-gray-500">Latest Visit</p>
                            <p className="text-xl font-bold text-gray-900">{records.length > 0 ? records[0].recordType : 'None'}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-red-500">
                        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600 text-xl">🚑</div>
                        <div>
                            <p className="text-sm text-gray-500">Emergency Profile</p>
                            <Link 
                                to={`/emergency/${localStorage.getItem('id')}`}
                                className="text-red-600 font-bold hover:underline text-sm"
                            >
                                View / Share QR
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="text-xl font-bold text-secondary mb-2">Doctor Access</h2>
                        <p className="text-gray-600">Generate a temporary code to share your records with a doctor.</p>
                    </div>
                    <div className="text-center flex flex-col items-center">
                        {accessCode ? (
                            <>
                                <div className="bg-teal-50 border-2 border-teal-200 rounded-xl px-8 py-3 mb-4">
                                    <span className="text-3xl font-mono font-bold text-teal-700 tracking-widest">{accessCode}</span>
                                </div>
                                <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                                    <QRCodeSVG value={`http://localhost:3000/doctor?code=${accessCode}`} size={128} />
                                </div>
                            </>
                        ) : (
                            <button 
                                onClick={generateCode}
                                className="bg-teal-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-700 transition-all shadow-md"
                            >
                                Generate New Code
                            </button>
                        )}
                        {accessCode && <p className="text-xs text-gray-400 mt-2">Doctor can scan this QR</p>}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-secondary">Medical Timeline</h3>
                    <div className="flex gap-2 w-full md:w-auto">
                        <input 
                            type="text" 
                            placeholder="Search diagnosis..." 
                            className="p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 flex-1 md:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select 
                            className="p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option>All</option>
                            <option>General Checkup</option>
                            <option>Emergency</option>
                            <option>Surgery</option>
                            <option>Lab Report</option>
                            <option>Vaccination</option>
                        </select>
                    </div>
                </div>
                
                <div className="space-y-6">
                    {records
                        .filter(r => 
                            (filterType === 'All' || r.recordType === filterType) &&
                            (r.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             r.doctorName.toLowerCase().includes(searchTerm.toLowerCase()))
                        )
                        .length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-400">No medical records found. Add your first record!</p>
                        </div>
                    ) : (
                        records.map((record) => (
                            <div key={record._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
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
                                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Doctor</p>
                                            <p className="text-gray-700">{record.doctorName}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Hospital</p>
                                            <p className="text-gray-700">{record.hospitalName}</p>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Prescription</p>
                                        <p className="text-teal-700 font-medium">{record.prescription}</p>
                                    </div>

                                    {record.notes && (
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Notes</p>
                                            <p className="text-gray-600 italic">{record.notes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <Link 
                to="/patient/add"
                className="fixed bottom-8 right-8 w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-3xl shadow-2xl hover:bg-teal-700 transition-all hover:scale-110"
            >
                +
            </Link>
        </div>
    );
};

export default PatientDashboard;
