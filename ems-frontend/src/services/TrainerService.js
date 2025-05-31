import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${ token }`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            window.location.href = '/login'
            return Promise.reject(new Error('Login Expired. Please Login Again!'))
        }

        if (error.response?.status === 403) {
            return Promise.reject(new Error('Access Denied'))
        }


        const message = error.response?.data?.message ||
            error.response?.data ||
            error.message ||
            'Request Failed'
        return Promise.reject(new Error(message))
    },
)

export const getTrainerList = () => api.get('trainers')

export const createTrainer = (trainer) => api.post('trainers',
    trainer)

export const getTrainerById = (trainerId) => api.get(`trainers/${ trainerId }`)

export const updateTrainer = (trainerId, trainer) => api.put(`trainers/${ trainerId }`, trainer)

export const deleteTrainer = (trainerId) => api.delete(`trainers/${ trainerId }`)

