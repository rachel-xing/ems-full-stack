import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const {login,error,isLoading} = useAuth()
    const navigator = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [ e.target.name ]: e.target.value,
        })
    }

    const handleSubmit = async (e)=> {
        e.preventDefault()
        await login(formData)
        navigator("/")
    }

    const quickLogin = (username, password) => {
        setFormData({ username, password })
    }

    return (
        <div className="container d-flex justify-content-center align-items-center bg-light-subtle">
            <div className="row w-100">
                <h1 className="text-center">Pokemon Trainer</h1>
                <p className="text-center">Login to Pokemon Trainer Management System</p>
                <div className="col-md-6 col-lg-4 mx-auto">

                    {/* Quick Login Button */ }
                    <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-3">Quick Login</p>
                        <div className="d-flex gap-2">
                            <button
                                onClick={ () => quickLogin('admin', 'password') }
                                className="btn btn-primary"
                            >
                                👨‍💼 Admin
                            </button>
                            <button
                                onClick={ () => quickLogin('ash', 'pikachu') }
                                className="btn btn-primary"
                            >
                                👤 User
                            </button>
                        </div>
                    </div>

                    {/* Login Form */ }
                    <form className="border rounded p-3 mt-3 shadow">
                        <div className="mt-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={ formData.username }
                                onChange={ handleChange }
                                className="form-control"
                                placeholder="Please enter username"
                                required
                            />
                        </div>

                        <div className="mt-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={ formData.password }
                                onChange={ handleChange }
                                className="form-control"
                                placeholder="Please enter password"
                                required
                            />
                        </div>

                        {/* Error Info */ }
                        { error && (
                            <div
                                className="d-flex align-items-center justify-content-center bg-danger-subtle rounded p-2 mt-3">
                                <p className="text-danger m-0">{ error }</p>
                            </div>
                        ) }

                        <button
                            onClick={ handleSubmit }
                            disabled={ isLoading }
                            className={ `btn btn-primary mt-3 ${
                                isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105'
                            }` }
                        >
                            { isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    登录中...
                                </div>
                            ) : (
                                '登录'
                            ) }
                        </button>
                    </form>


                    {/* Test Info */ }
                    <div className="mt-5">
                        <h3>Test Account:</h3>
                        <div>
                            <div>👨‍💼 <strong>Admin:</strong> admin / password (All permissions)</div>
                            <div>👤 <strong>User:</strong> ash / pikachu (Read permission)</div>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Login