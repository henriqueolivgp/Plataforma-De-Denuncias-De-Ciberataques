import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile';

interface PrivateRoutesProps {
  element: ReactNode;
}

export function PrivateAdmin({
  element,
}: PrivateRoutesProps) {
  const { isSpecialist } = useProfile();

  if (!isSpecialist) {
    return isSpecialist ? element : <Navigate to='/' replace />;
  }else{
    return isSpecialist ? element : <Navigate to='/profile/admin' replace />
  }
  
}
