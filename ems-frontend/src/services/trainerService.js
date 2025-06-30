import api from '../api/apiClient.jsx'

export const getTrainerList = () => api.get('trainers')

export const createTrainer = (trainer) => api.post('trainers', trainer)

export const getTrainerById = (trainerId) => api.get(`trainers/${ trainerId }`)

export const updateTrainer = (trainerId, trainer) => api.put(`trainers/${ trainerId }`, trainer)

export const deleteTrainer = (trainerId) => api.delete(`trainers/${ trainerId }`)

export const searchTrainer = (query)=> api.get(`trainers/search?q=${query}`)

