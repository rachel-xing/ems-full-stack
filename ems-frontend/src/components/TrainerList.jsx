import { useTrainers } from '../context/TrainerContext.jsx'
import { searchTrainer } from '../services/TrainerService.js'
import { deleteTrainer } from '../services/TrainerService.js'

import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line react/prop-types
const TrainerList = ({role}) => {
    const { trainers, setTrainers, loadTrainers } = useTrainers()
    const navigator = useNavigate()

    function createNewTrainer () {
        navigator('/create-trainer')
    }

    function updateTrainer (id) {
        navigator(`/update-trainer/${ id }`)
    }

    function removeTrainer (id) {
        deleteTrainer(id).then(() => {
            loadTrainers()
        }).catch(error => {
            console.log(error)
        })
    }

    const handleSearch = async(e) => {
        e.preventDefault()
        const query = e.target.search.value
        console.log('Searching for:', query)
        const res = await searchTrainer(query)
        const searchedTrainer = res.data
        setTrainers(searchedTrainer)
    }

    return (
        <div className="contrainer m-3">
            <h2 className="text-center">List of Trainers</h2>
            <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-success mb-2"
                        onClick={ createNewTrainer }>Create Trainer
                </button>
                <form className="d-flex" role="search" onSubmit={ handleSearch }>
                    <input className="form-control me-2" type="search" name="search"
                           placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success"
                            type="submit">Search
                    </button>
                </form>
            </div>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Trainer ID</th>
                        <th>Trainer First Name</th>
                        <th>Trainer Last Name</th>
                        <th>Trainer Email</th>
                        <th>Trainer Region</th>
                        { role === "ADMIN" &&
                            <th>Actions</th>
                        }

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
                                { role === "ADMIN" &&
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
                                }


                            </tr>)
                    }
                </tbody>
            </table>
        </div>

    )
}

export default TrainerList