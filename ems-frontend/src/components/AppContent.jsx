import './AppContent.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { TrainerProvider } from '../context/TrainerContext.jsx'
import Login from '../pages/Login.jsx'
import Home from '../pages/Home.jsx'
import TrainerList from '../pages/TrainerList.jsx'
import Trainer from '../pages/Trainer.jsx'
import Statistics from '../pages/Statistics.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import AuthRoute from './AuthRoute.jsx'

const AppContent = () => {
    return (
        <TrainerProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={
                        <AuthRoute><Login/> </AuthRoute>
                    }/>
                    <Route path="/" element={
                        <ProtectedRoute requiredRoles={ ['ADMIN', 'USER'] }><Home/> </ProtectedRoute>

                    }/>

                    <Route path="/trainers" element={
                        <ProtectedRoute requiredRoles={ ['ADMIN', 'USER'] }><TrainerList/>
                        </ProtectedRoute>
                    }
                    />

                    <Route path="/create-trainer" element={
                        <ProtectedRoute requiredRoles={ ['ADMIN'] }><Trainer/> </ProtectedRoute>
                    }/>

                    <Route path="/update-trainer/:id" element={
                        <ProtectedRoute requiredRoles={ ['ADMIN'] }><Trainer/> </ProtectedRoute>
                    }/>

                    <Route path="/statistics" element={
                        <ProtectedRoute requiredRoles={ ['ADMIN'] }><Statistics/> </ProtectedRoute>
                    }/>

                    <Route path="*" element={ <Navigate to="/" replace/> }/>
                </Routes>

            </Router>
        </TrainerProvider>

    )
}

export default AppContent
