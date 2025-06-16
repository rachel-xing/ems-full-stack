import { createContext, useCallback, useState } from 'react'

const AuthContext = createContext()

const STORAGE_KEYS = {
    TOKEN: 'token',
    USERNAME: 'username',
    ROLE: 'role',
}

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [role, setRole] = useState('')
    const [loading, setIsLoading] = useState()
    const [error, setError] = useState('')

    const login = useCallback(
        async(credentials) => {
            if (!credentials?.username || !credentials?.password) {
                setError('Username and password are required')
            }

            setIsLoading(true)

            try {
                const response = await login(credentials)
                const data = response.data
                localStorage.setItem(STORAGE_KEYS.TOKEN, data.token)
                localStorage.setItem(STORAGE_KEYS.USERNAME, data.username)
                setIsAuthenticated(true)


            } catch {

            }

        },
        [],
    )

}