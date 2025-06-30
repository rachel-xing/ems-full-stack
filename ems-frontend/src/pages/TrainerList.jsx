import { useTrainers } from '../context/TrainerContext.jsx'
import { searchTrainer } from '../services/trainerService.js'
import { deleteTrainer } from '../services/trainerService.js'

import { useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout.jsx'
import ContentHeader from '../components/ContentHeader.jsx'
// eslint-disable-next-line react/prop-types
const TrainerList = ({ role }) => {
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
        <Layout>
            <ContentHeader title='Trainer List' path='/trainers'/>
            <div className="contrainer bg-white rounded-4 p-5">

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

                <div className="table-container rounded-4 overflow-hidden border">

                    <table className="table table-striped m-0">
                        <thead>
                            <tr>
                                <th>Trainer #</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th> Region</th>
                                { role === 'ADMIN' &&
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
                                        { role === 'ADMIN' &&
                                            <td>
                                                <button className="btn btn-success ms-2 "
                                                        onClick={ () => updateTrainer(
                                                            trainer.id) }>Update
                                                </button>
                                                <button className="btn btn-danger ms-2"
                                                        onClick={ () => removeTrainer(
                                                            trainer.id) }
                                                >Delete
                                                </button>
                                            </td>
                                        }


                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export default TrainerList