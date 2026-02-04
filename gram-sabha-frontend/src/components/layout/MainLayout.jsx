// Main Layout Component
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <div className="main-container">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
