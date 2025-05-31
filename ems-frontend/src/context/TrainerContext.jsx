import { createContext, useContext, useEffect, useState } from 'react'
import { createTrainer, deleteTrainer, getTrainerList, updateTrainer } from '../services/TrainerService'

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
            throw err
        }
    }

    const editTrainer = async (trainerId,trainer) => {
        try {
            const response = await updateTrainer(trainerId,trainer)
            loadTrainers()
            return response.data
        } catch (err) {
            throw err
        }
    }

    const removeTrainer = async () => {
        try {
            const response = await deleteTrainer()
            loadTrainers()
            return response.data
        } catch (err) {
            throw err
        }
    }

    useEffect(() => {
        // 只有在有token的情况下才加载数据
        const token = localStorage.getItem('token')
        if (token) {
            loadTrainers()
        }
    }, [])

    const contextValue = {
        // 原有的数据（向后兼容）
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
