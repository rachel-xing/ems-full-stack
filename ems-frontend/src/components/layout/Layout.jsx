import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const Layout = ({ children }) => {
    const { isAuthenticated, error } = useAuth()

    return (
        <div className="min-h-screen flex flex-col">
            {isAuthenticated && <Header />}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 mt-4 rounded">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <main className="flex-1 main-content">
                {children}
            </main>

            {isAuthenticated && <Footer />}
        </div>
    )
}

export default Layout