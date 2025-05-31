import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigator = useNavigate()

    // 处理输入变化
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [ e.target.name ]: e.target.value,
        })
        // 清除错误信息
        setError('')
    }

    // 处理登录提交
    const handleSubmit = async() => {
        if (!formData.username || !formData.password) {
            setError('Please enter username and password')
            return
        }

        setIsLoading(true)
        setError('')
        setSuccess('')

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                const data = await response.json()
                setSuccess(`Log in Successfully! Welcome ${ data.username }`)

                // store token to localStorage
                onLogin(data.token, data.username)
                navigator('/')

            } else {
                const errorText = await response.text()
                setError(errorText || 'Login failed. Please check username ans password.')
            }
        }
        catch (err) {
            setError('Connect failed. Please check network.')
            console.error('Login error:', err)
        } finally {
            setIsLoading(false)
        }
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

                        {/* 错误信息 */ }
                        { error && (
                            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                                <div className="flex">
                                    <span className="text-red-500 mr-2">⚠️</span>
                                    <p className="text-red-700">{ error }</p>
                                </div>
                            </div>
                        ) }

                        {/* 成功信息 */ }
                        { success && (
                            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                                <div className="flex">
                                    <span className="text-green-500 mr-2">✅</span>
                                    <p className="text-green-700">{ success }</p>
                                </div>
                            </div>
                        ) }

                        {/* 登录按钮 */ }
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