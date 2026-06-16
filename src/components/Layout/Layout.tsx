import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-ivory relative">
            <Header />
            <main className="flex-grow relative z-10">
                <Outlet />
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
}