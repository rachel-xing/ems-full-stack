import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Layout from './layout/Layout.jsx'

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
    const { isAuthenticated, isLoading } = useAuth()
    const location = useLocation()
    const role = localStorage.getItem('role')

    if (isLoading) {
        return <div>Loading....</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={ { from: location } } replace/>
    }

    const isAuthorized = requiredRoles.includes(role)

    if (!role || !isAuthorized) {
        return (
            <Layout>
                <div className="text-center">
                    <h2 className="mb-4">Access Denied</h2>

                    <p className="mb-4">
                        You do not have permission to access this page.
                    </p>

                    <p className="mb-4">
                        Required role: { requiredRoles.join(',') }
                    </p>

                    <p className="mb-4">
                        Your role: { role || 'None' }
                    </p>
                </div>
            </Layout>
        )
    }

    return children
}

export default ProtectedRoute
