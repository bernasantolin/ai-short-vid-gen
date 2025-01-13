import React from 'react';
import Header from './components/Header';
import SideNav from './components/SideNav';

export const DashboarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <div className="hidden md:block h-screen bg-white fixed mt-[65px] w-64">
                <SideNav/>
            </div>
            <Header/>
            <main className="md:ml-64 p-10">
                {children}
            </main>
        </div>
    );
}

export default DashboarLayout;