import { createContext, useState, useContext, useEffect } from 'react'
import { loginApi } from '../services/authService.js'

const AuthContext = createContext()
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [role, setRole] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsAuthenticated(true)
        } else {
            console.log('No stored token found')
        }
        setIsLoading(false)
    }, [])

    const login = async(credentials) => {
        if (!credentials?.username || !credentials?.password) {
            setError('Username and password are required')
            return
        }

        try {
            setIsLoading(true)
            const response = await loginApi(credentials)
            const data = response.data

            if (!data.token) {
                throw new Error('No authentication token received')
            }

            const userRole = data.roles?.[0]?.name || ''
            setIsAuthenticated(true)

            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            localStorage.setItem('role',userRole)


        }
        catch (error) {
            console.error('Error occurred', error)
            setError(error.message)
            throw error
        } finally {
            setIsLoading(false)
        }

    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('role')
        setIsAuthenticated(false)
        setError('')
    }

    const values = {
        isAuthenticated,
        isLoading,
        role,
        error,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={ values }>
            { children }
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)