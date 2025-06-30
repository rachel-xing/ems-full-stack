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
    const { role } = useAuth()

    return (
        <TrainerProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={ <Login/> }/>
                    <Route path="/" element={ <Home/> }/>

                    <Route path="/trainers" element={ <TrainerList role={ role }/> }/>
                    <Route path="/create-trainer" element={ <Trainer/> }/>

                    <Route path="/update-trainer/:id" element={ <Trainer/> }/>

                    <Route path="/statistics" element={ <Statistics/> }/>

                    <Route path="*" element={ <Navigate to="/" replace/> }/>
                </Routes>

            </Router>
        </TrainerProvider>

    )
}

export default AppContent
