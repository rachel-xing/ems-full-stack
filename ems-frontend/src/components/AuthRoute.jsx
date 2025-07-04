import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const AuthRoute = ({ children}) => {
    const { isAuthenticated, isLoading } = useAuth()
    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return children;
}

export default AuthRoute;