import React, { useState } from 'react'
import './Sidebar.css'
import { sidebarData } from '../../../assets/data.js'
import { TbLayoutSidebarLeftCollapse } from 'react-icons/tb'
import { Link, useLocation } from 'react-router-dom'

function Sidebar () {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const location = useLocation()

    const toggleSidebar = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsCollapsed(prev => !prev)
    }

    const handleItemClick = (e) => {
        e.stopPropagation()
    }
    return (
        <nav className={ `sidebar p-3 ${ isCollapsed ? 'collapsed' : '' }` }>
            <div className={ `d-flex mb-3 ${ isCollapsed ? 'justify-content-around' : 'justify-content-between' }` }>
                { !isCollapsed && <h3 className="appLogo">My App</h3> }
                <div className="toggleContainer" onClick={ toggleSidebar }><TbLayoutSidebarLeftCollapse/></div>
            </div>

            { sidebarData.map((section, index) => (
                <ul key={ index } className="p-0">
                    { !isCollapsed && <p className="text-muted">{ section.title }</p> }

                    { section.items.map((item, idx) => {
                        const isActive = location.pathname === item.path

                        return (
                            <li key={ idx } className={ `d-flex gap-1 align-items-center ${ isCollapsed
                                ? 'justify-content-center' : '' } ${isActive ? 'active' : ''}` }>
                                <Link to={ item.path } className="p-1" onClick={ handleItemClick }>
                                    { <item.icon/> }
                                    { !isCollapsed && item.label }
                                </Link>

                            </li>
                        )
                    }) }
                </ul>

            )) }
        </nav>
    )
}

export default Sidebar