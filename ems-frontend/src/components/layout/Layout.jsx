import React from 'react'
import Sidebar from './sidebar/Sidebar.jsx'

const Layout = ({ children }) => {

    return (
        <div className="d-flex">
            <Sidebar/>
            <main className="p-5 bg-light flex-fill">
                { children }
            </main>
        </div>
    )
}

export default Layout