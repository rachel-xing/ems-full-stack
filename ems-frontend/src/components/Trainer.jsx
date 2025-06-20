import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { useTrainers } from '../context/TrainerContext.jsx'
import { getTrainerById } from '../services/TrainerService.js'

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
    const { addTrainer, editTrainer, getExistingTrainerById } = useTrainers()

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
        }

        setErrors(newErrors)
        return isValid
    }

    // 🔧 修复useEffect
    useEffect(() => {
        if (id) {
            console.log('🔍 加载训练师数据 ID:', id)

            // 先尝试从Context获取（性能优化）
            const existingTrainer = getExistingTrainerById(id)
            if (existingTrainer) {
                console.log('✅ 从Context获取训练师数据:', existingTrainer)
                setFormData(existingTrainer)
            } else {
                // 从API获取
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

        if (validateForm()) {
            if (id) {
                await editTrainer(id, formData)
                alert('训练师更新成功！')

            } else {
                await addTrainer(formData)
                alert('训练师创建成功！')
            }
        }

        navigator('/trainers')
    }

    function pageTitle () {
        return (
            <h2 className="text-center p-2">{ id ? 'Update Trainer' : 'Create Trainer' }</h2>
        )

    }

    return (
        <div className="container">
            <br/><br/>
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    {
                        pageTitle()
                    }
                    <div className="card-body">
                        <form>
                            { fields.map((field) => (
                                <div className="form-group mb-2"
                                     key={ field.name }>
                                    <label htmlFor={ field.name }
                                           className="form-label">
                                        { field.label }:
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

                            <button className="btn btn-success"
                                // style={{backgroundColor: "#A0D8B3"}}
                                    onClick={ createOrUpdateTrainer }>
                                Submit
                            </button>
                        </form>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Trainer