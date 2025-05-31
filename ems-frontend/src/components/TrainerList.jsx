import { useTrainers } from '../context/TrainerContext.jsx'

import {
    deleteTrainer,
} from '../services/TrainerService.js'

import { useNavigate } from 'react-router-dom'

const TrainerList = () => {
    const { trainers, setTrainers } = useTrainers()
    const navigator = useNavigate()

    function createNewTrainer () {
        navigator('/create-trainer')
    }

    function updateTrainer (id) {
        navigator(`/update-trainer/${ id }`)
    }

    function removeTrainer (id) {

        deleteTrainer(id).then(() => {
            setTrainers()
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="contrainer m-3">
            <h2 className="text-center">List of Trainers</h2>
            <button className="btn btn-success mb-2"
                    onClick={ createNewTrainer }>Create Trainer
            </button>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Trainer ID</th>
                        <th>Trainer First Name</th>
                        <th>Trainer Last Name</th>
                        <th>Trainer Email</th>
                        <th>Trainer Region</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        trainers.map(trainer =>
                            <tr key={ trainer.id }>
                                <td>{ trainer.id }</td>
                                <td>{ trainer.firstName }</td>
                                <td>{ trainer.lastName }</td>
                                <td>{ trainer.email }</td>
                                <td>{ trainer.region }</td>
                                <th>
                                    <button className="btn btn-success ms-2 "
                                            onClick={ () => updateTrainer(
                                                trainer.id) }>Update
                                    </button>
                                    <button className="btn btn-danger ms-2"
                                            onClick={ () => removeTrainer(
                                                trainer.id) }
                                    >Delete
                                    </button>
                                </th>


                            </tr>)
                    }
                </tbody>
            </table>
        </div>

    )
}

export default TrainerList