import { createContext, useContext, useEffect, useState } from 'react'
import { createTrainer, deleteTrainer, getTrainerList, updateTrainer } from '../services/trainerService.js'

const TrainerContext = createContext()

// eslint-disable-next-line react/prop-types
export const TrainerProvider = ({ children }) => {
    const [trainers, setTrainers] = useState([])
    const [error, setError] = useState()

    const loadTrainers = async () => {
        try {
            const response = await getTrainerList()
            setTrainers(response.data)
        } catch (err) {
            setError(err.message)
        }
    }

    const getExistingTrainerById = (id) => {
        return trainers.find(trainer => trainer.id === parseInt(id))
    }

    const addTrainer = async (trainer)=> {
        try {
            const response = await createTrainer(trainer)
            await loadTrainers()
            return response.data
        } catch (err) {
            setError(err.message)
        }
    }

    const editTrainer = async (trainerId,trainer) => {
        try {
            const response = await updateTrainer(trainerId, trainer)
            await loadTrainers()
            return response.data
        } catch(err) {
            setError(err.message)
        }
    }

    const removeTrainer = async (trainerId) => {
        try {
            const response = await deleteTrainer(trainerId)
            await loadTrainers()
            return response.data
        } catch (err) {
            setError(err.message)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            loadTrainers()
        }
    }, [])

    const contextValue = {
        trainers,
        setTrainers,
        error,
        loadTrainers,
        addTrainer,
        editTrainer,
        removeTrainer,
        getExistingTrainerById,
    }

    return (
        <TrainerContext.Provider value={contextValue}>
            {children}
        </TrainerContext.Provider>
    )
}

export const useTrainers = () => useContext(TrainerContext)
