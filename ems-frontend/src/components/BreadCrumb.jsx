import React from 'react'
import { Link } from 'react-router-dom'

function BreadCrumb ({path,label}) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={path} className="text-decoration-none text-reset">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{label}</li>
            </ol>
        </nav>
    )
}

export default BreadCrumb