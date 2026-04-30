import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-sky-500/20 blur-[140px]" />
      </div>
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
