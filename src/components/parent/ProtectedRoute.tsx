import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isParentLoggedIn');
    
    if (!isLoggedIn || isLoggedIn !== 'true') {
      // Not logged in, redirect to auth page
      navigate('/parent');
    }
  }, [navigate]);

  return <>{children}</>;
}
