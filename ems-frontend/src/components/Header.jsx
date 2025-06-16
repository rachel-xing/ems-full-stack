import { useNavigate, NavLink } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const Header = ({ onLogout }) => {
    const navigator = useNavigate()

    const handleLogout = () => {
        if (window.confirm('Are you sure to log out？')) {
            onLogout()
            navigator('/login')
        }
    }

    const getNavLinkClass = ({ isActive }) => `nav-link m-2 ${isActive ? 'active fw-bold' : ''}`
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-success-subtle">
                <div className="container-fluid">
                    <NavLink to="/home" className="navbar-brand">
                        Trainer Management System
                    </NavLink>
                    <button className="navbar-toggler" type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <NavLink className={ getNavLinkClass } to="/">Home</NavLink>
                        <NavLink className={ getNavLinkClass } to="/trainers">Trainers</NavLink>
                        <NavLink className={ getNavLinkClass } to="/statistics">Statistics</NavLink>
                        <NavLink className={ getNavLinkClass } to="/logout" onClick={ handleLogout }>Log Out</NavLink>
                    </div>
                </div>
            </nav>

        </header>

    )
}

export default Header