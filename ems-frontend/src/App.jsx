import './App.css'
import TrainerList from './components/TrainerList.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom'
import Trainer from './components/Trainer.jsx'
import Home from './pages/Home.jsx'
import { TrainerProvider } from './context/TrainerContext.jsx'
import { useEffect, useState } from 'react'
import Login from './pages/Login.jsx'
import Statistics from './pages/Statistics.jsx'

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" replace />;
};

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? <Navigate to="/" replace /> : children;
};

function App () {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [role, setRole] = useState("");

    const username = localStorage.getItem("username")
    const fetchUser = async(token) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${ username }`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })

            if (response.ok) {
                const data = await response.json()
                if (data.roles?.length > 0) {
                    setRole(data.roles[0].name)
                }
                return data
            } else {
                console.log("role not found")
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    // Check authentication status
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
        setIsLoading(false);

        if (token) {
            fetchUser(token);
        }

    }, []);



    // Handle log in
    const handleLogin = async (token, username) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setIsAuthenticated(true);
        await fetchUser(token)
    };

    // Handle log out
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem("role")
        setIsAuthenticated(false);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <TrainerProvider>
            <div className="app-container">
                <BrowserRouter>
                    {isAuthenticated && <Header onLogout={handleLogout} />}
                    <main className="main-content">
                        <Routes>
                            <Route path="/login" element={
                                    <AuthRoute>
                                        <Login onLogin={handleLogin} />
                                    </AuthRoute>
                                }
                            />

                            <Route path="/" element={
                                    <ProtectedRoute>
                                        <Home />
                                    </ProtectedRoute>
                                }
                            />

                            <Route path="/trainers" element={
                                    <ProtectedRoute>
                                        <TrainerList role={role} />
                                    </ProtectedRoute>
                                }
                            />

                            <Route path="/create-trainer" element={
                                    <ProtectedRoute>
                                        <Trainer />
                                    </ProtectedRoute>
                                }
                            />

                            <Route path="/update-trainer/:id" element={
                                    <ProtectedRoute>
                                        <Trainer />
                                    </ProtectedRoute>
                                }
                            />

                            <Route path="/statistics" element={
                                    <ProtectedRoute>
                                        <Statistics />
                                    </ProtectedRoute>
                                }
                            />

                            <Route path="*" element={
                                <Navigate to="/" replace />
                            }
                            />
                        </Routes>
                    </main>

                    {isAuthenticated && <Footer />}
                </BrowserRouter>
            </div>
        </TrainerProvider>
    );
}

export default App
