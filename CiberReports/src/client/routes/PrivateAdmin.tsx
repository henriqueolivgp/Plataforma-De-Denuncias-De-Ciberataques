import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile';

interface PrivateRoutesProps {
  element: ReactNode;
}

export function PrivateAdmin({
  element,
}: PrivateRoutesProps) {
  const { isAdmin } = useProfile();

  if (!isAdmin) {
    return isAdmin ? element : <Navigate to='/' replace />;
  }else{
    return isAdmin ? element : <Navigate to='/profile/admin' replace />
  }
  
}
