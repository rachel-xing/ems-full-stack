import AppContent from './components/AppContent.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

function App () {
    return (
        <AuthProvider>
           <AppContent/>
        </AuthProvider>
    )
}

export default App
