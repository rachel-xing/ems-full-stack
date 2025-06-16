import api from '../api/apiClient.jsx'

export const login = (loginData) => api.post('auth/login', loginData)

