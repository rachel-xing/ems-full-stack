    import React, { useState } from 'react'
    import './Sidebar.css'
    import { Link, useLocation } from 'react-router-dom'
    import { FiHome } from 'react-icons/fi'
    import { TbLogout2 } from 'react-icons/tb'
    import { FaUsers } from 'react-icons/fa'
    import { FcStatistics } from 'react-icons/fc'
    import { TbLayoutSidebarLeftCollapse } from 'react-icons/tb'
    import { TbLayoutSidebarRightCollapse } from "react-icons/tb";


    const sidebarData = [
        { icon: FiHome, label: 'Home', path: '/' },
        { icon: FaUsers, label: 'Trainers', path: '/trainers' },
        { icon: FcStatistics, label: 'Statistics', path: '/statistics' },
    ]

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
            <nav className={ `d-flex flex-column justify-content-between sidebar p-3 ${ isCollapsed ? 'collapsed' : '' }` }>
                <div>
                    <div
                        className={ `d-flex mb-3 ${ isCollapsed ? 'justify-content-around' : 'justify-content-between' }` }>
                        { !isCollapsed && <h3 className="appLogo">My App</h3> }
                        <div className="toggleContainer" onClick={ toggleSidebar }>
                            {!isCollapsed && <TbLayoutSidebarLeftCollapse/>}
                            {isCollapsed && <TbLayoutSidebarRightCollapse/>}
                        </div>
                    </div>

                    <ul className="p-0">
                        { sidebarData.map((item, index) => {
                                const isActive = location.pathname === item.path
                                return (
                                    <li key={ index } className={ `d-flex mb-3 ${ isCollapsed
                                        ? 'justify-content-center' : '' } ${ isActive ? 'active' : '' }` }>
                                        <Link to={ item.path } className="d-flex gap-2 align-items-center" onClick={ handleItemClick }>
                                            { <item.icon/> }
                                            { !isCollapsed && <div>{ item.label }</div> }
                                        </Link>
                                    </li>
                                )
                            },
                        ) }
                    </ul>
                </div>
                <ul className='p-0'>
                    <li>
                        <Link to="/login" className='d-flex gap-2 align-items-center'>
                            <TbLogout2/>
                            {!isCollapsed && <div>Log out</div>}
                        </Link>
                    </li>

                </ul>

            </nav>
        )
    }

    export default Sidebar