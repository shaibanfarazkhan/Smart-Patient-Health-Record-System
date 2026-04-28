import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-4xl w-full text-center">
                <div className="flex items-center justify-center mb-8">
                    <div className="w-16 h-16 bg-teal-600 rounded-lg flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                        M
                    </div>
                    <h1 className="text-4xl font-bold text-secondary ml-4 tracking-tight">MediChain</h1>
                </div>
                
                <h2 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                    Your Complete Health History <br />
                    <span className="text-teal-600">in One Place</span>
                </h2>
                
                <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                    Securely store, manage, and share your medical records with trusted healthcare providers. 
                    Fast, encrypted, and decentralized access to your health timeline.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/auth" className="px-8 py-4 bg-teal-600 text-white rounded-xl font-bold text-lg hover:bg-teal-700 transition-all shadow-lg hover:shadow-teal-200">
                        Sign Up Now
                    </Link>
                    <Link to="/auth" className="px-8 py-4 bg-white text-secondary border-2 border-secondary rounded-xl font-bold text-lg hover:bg-gray-50 transition-all">
                        Log In
                    </Link>
                </div>
                
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-teal-600 text-2xl mb-4">🔒</div>
                        <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
                        <p className="text-gray-600">Your data is encrypted and only accessible by you and authorized doctors.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-teal-600 text-2xl mb-4">📋</div>
                        <h3 className="text-xl font-bold mb-2">Full Timeline</h3>
                        <p className="text-gray-600">Keep track of every checkup, surgery, and prescription in one unified view.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-teal-600 text-2xl mb-4">⚡</div>
                        <h3 className="text-xl font-bold mb-2">Instant Access</h3>
                        <p className="text-gray-600">Generate temporary access codes for doctors to view your records instantly.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
