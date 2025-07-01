import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { useTrainers } from '../context/TrainerContext.jsx'
import { getTrainerById } from '../services/trainerService.js'
import Layout from '../components/layout/Layout.jsx'
import ContentHeader from '../components/ContentHeader.jsx'

const Trainer = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        region: '',
        role: '',
    })

    const [errors, setErrors] = useState({})
    const { id } = useParams()
    const navigator = useNavigate()
    const { trainers, addTrainer, editTrainer, getExistingTrainerById } = useTrainers()

    const fields = [
        { name: 'firstName', label: 'First Name' },
        { name: 'lastName', label: 'Last Name' },
        { name: 'email', label: 'Email' },
        { name: 'region', label: 'Region' },
    ]

    function validateForm () {
        let isValid = true
        const newErrors = {}

        for (const field of fields) {
            if (!formData[ field.name ]?.trim()) {
                newErrors[ field.name ] = `${ field.label } is required`
                isValid = false
            }
        }

        if (formData.email && formData.email.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

            if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Invalid email format'
                isValid = false
            }

            const existed = trainers.some(trainer => trainer.email === formData.email)

            // check if email unique when create
            if (!id && existed) {
                newErrors.email = 'Email already existed.'
                isValid = false
            }
        }

        setErrors(newErrors)
        return isValid
    }

    useEffect(() => {
        if (id) {
            console.log('🔍 Loading Trainer Data ID:', id)
            // Try acquiring existing trainer from context first to improve performance
            const existingTrainer = getExistingTrainerById(id)
            if (existingTrainer) {
                console.log('✅ Acquiring data from context:', existingTrainer)
                setFormData(existingTrainer)
            } else {
                // Acquire through API
                getTrainerById(id).then(response => {
                    setFormData(response.data)
                })
            }
        }
    }, [id, getTrainerById])

    function handleChange (e) {
        setFormData({ ...formData, [ e.target.name ]: e.target.value })
    }

    async function createOrUpdateTrainer (e) {
        e.preventDefault()
        const isValid = validateForm()

        if (isValid) {
            if (id) {
                await editTrainer(id, formData)
                alert('Trainer Updated successfully！')
                navigator('/trainers')

            } else {

                await addTrainer(formData)
                alert('Trainer Created successfully！')
                navigator('/trainers')
            }
        }
    }

    const handleCancel = (e) => {
        e.preventDefault()
        navigator('/trainers')
    }

    const pageTitle = () => {
        return id ? 'Update Trainer' : 'Create Trainer'
    }

    return (
        <Layout>
            <ContentHeader title={ pageTitle() } path="/"/>
            <div className="row">
                <form className='bg-white rounded-4 p-3 col-12 col-md-6'>
                    { fields.map((field) => (
                        <div className="form-group mb-2"
                             key={ field.name }>
                            <label htmlFor={ field.name }
                                   className="form-label">
                                { field.label }
                            </label>
                            <input
                                type="text"
                                name={ field.name }
                                placeholder={ `Enter Trainer ${ field.label }` }
                                className={ `form-control ${ errors[ field.name ] ? 'is-invalid' : '' }` }
                                value={ formData[ field.name ] }
                                onChange={ handleChange }
                            />
                            { errors[ field.name ] && (
                                <div
                                    className="invalid-feedback">{ errors[ field.name ] }</div>
                            ) }
                        </div>
                    )) }

                    <button className="btn btn-success me-3" onClick={ createOrUpdateTrainer }>Submit
                    </button>
                    <button className="btn btn-primary" onClick={ handleCancel }>Cancel</button>
                </form>


            </div>


        </Layout>

    )
}

export default Trainer