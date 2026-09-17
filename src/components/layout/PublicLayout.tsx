import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../TopBar';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Chatbot from '../Chatbot';

const PublicLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-white">
        <TopBar />
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
      <Chatbot />
    </>
  );
};

export default PublicLayout;
