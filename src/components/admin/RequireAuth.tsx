import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/react';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-slate-200">
        Cargando...
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/admin" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default RequireAuth;
