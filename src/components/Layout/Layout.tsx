import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gold-50/20 via-white to-silver-50/20 relative">
            {/* Background decorative patterns */}
            <div className="fixed inset-0 bg-paisley opacity-5 pointer-events-none"></div>
            <div className="fixed inset-0 bg-mandala opacity-3 pointer-events-none"></div>
            
            <Header />
            <main className="flex-grow relative z-10">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
} 