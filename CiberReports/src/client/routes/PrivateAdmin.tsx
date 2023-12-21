import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile';

interface PrivateRoutesProps {
  element: ReactNode;
}

export function PrivateAdmin({
  element,
}: PrivateRoutesProps) {
  const { isAdmin, profile } = useProfile();

  console.log(profile[0].admin);

  console.log(isAdmin);

  if (!isAdmin) {
    return isAdmin ? element : <Navigate to='/' replace />;
  }
  
}
