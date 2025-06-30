import api from '../api/apiClient.jsx'

export const loginApi = (loginData) => api.post('auth/login', loginData)

