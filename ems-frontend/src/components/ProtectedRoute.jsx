import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const ProtectedRoute = ({ children, requiredRoles=[] }) => {
    const { isAuthenticated, isLoading, role } = useAuth()
    const location = useLocation()

    if (isLoading) {
        return <div>Loading....</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={ { from: location } } replace/>
    }

    const isAuthorized= requiredRoles.includes(role)

    if (!role || !isAuthorized) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
                    <p className="text-gray-600 mb-4">
                        You do not have permission to access this page.
                    </p>
                    <p className="text-sm text-gray-500">
                        Required role: { requiredRoles.join(",") }
                    </p>
                    <p className="text-sm text-gray-500">
                        Your role: { role || 'None' }
                    </p>
                </div>
            </div>
        )
    }

    return children
}

export default ProtectedRoute
