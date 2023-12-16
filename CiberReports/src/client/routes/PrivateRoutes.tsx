import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'

interface PrivateRoutesProps {
    element: ReactNode
    notHaveAccessNavigateTo: string
}

export function PrivateRoutes({
    element,
    notHaveAccessNavigateTo
}: PrivateRoutesProps) {
    const { user, loading} = useAuth()

    if (loading) {
        return (
            <p>Carregando...</p>
        )
    }

    return user ? element : <Navigate to={notHaveAccessNavigateTo} replace />
}