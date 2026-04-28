import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import API from '../api';

const EmergencyProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmergencyInfo = async () => {
            try {
                const response = await API.get(`/emergency/${id}`);
                setUser(response.data);
            } catch (err) {
                setError('Emergency profile not found or inactive.');
            } finally {
                setLoading(false);
            }
        };
        fetchEmergencyInfo();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-teal-600 font-bold">Loading Emergency Profile...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-600 font-bold">{error}</div>;

    return (
        <div className="min-h-screen bg-red-600 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border-4 border-white">
                <div className="bg-red-700 p-8 text-center text-white">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-red-700 text-4xl font-bold mx-auto mb-4 shadow-inner">
                        🚑
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter">Emergency Info</h1>
                    <p className="opacity-80 font-medium">Critical Patient Data</p>
                </div>
                
                <div className="p-8 space-y-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                        <div className="mt-2 inline-block bg-red-50 text-red-700 px-4 py-1 rounded-full font-bold border border-red-100">
                            Blood Group: {user.bloodGroup || 'N/A'}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Known Allergies</p>
                            <p className="text-gray-800 font-medium">{user.allergies || 'None reported'}</p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Emergency Contact</p>
                            <p className="text-red-600 text-xl font-bold">{user.emergencyContact || 'N/A'}</p>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-100 text-center">
                        <p className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-widest">Emergency QR Card</p>
                        <div className="inline-block p-4 bg-white rounded-2xl shadow-sm border border-gray-100 mb-4">
                            <QRCodeSVG value={`${window.location.origin}/emergency/${id}`} size={150} />
                        </div>
                        <p className="text-xs text-gray-400 italic">Scan this to quickly access my vital health information</p>
                        <button 
                            onClick={() => window.print()}
                            className="mt-6 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all no-print"
                        >
                            Print Emergency Card
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyProfile;
