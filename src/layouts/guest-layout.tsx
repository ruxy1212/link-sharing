'use client';

import { useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Context } from '@/hooks/context';
import { auth } from '@/firebase/Configuration';
import { CircularProgress } from '@mui/material';

interface AuthWrapperProps {
  children: React.ReactNode;
  variant: 'forHome' | 'forAuth';
}

const GuestLayout = ({ children, variant }: AuthWrapperProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const context = useContext(Context);

  if (!context) {
    throw new Error('AuthWrapper must be used within a Context.Provider');
  }

  const { setUid } = context;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUid(currentUser.uid);
        setIsAuthenticated(true);

        if (variant === 'forAuth') {
          router.push('/dashboard');
        }
      } else {
        setUid('');
        setIsAuthenticated(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setUid, router, variant]);

  if (isAuthenticated === null) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <CircularProgress className="text-dl-light-purple" color="secondary" />
      </div>
    );
  }

  if (variant === 'forAuth' && isAuthenticated) {
    return null; // Redirecting to dashboard, so no content is rendered
  }

  return <>{children}</>;
};

export default GuestLayout;