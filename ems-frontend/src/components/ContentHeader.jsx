import React from 'react'
import BreadCrumb from './BreadCrumb.jsx'

function ContentHeader ({title,path}) {
    return (
        <div>
            <h3>{title}</h3>
            <BreadCrumb label={title} path={path}/>
        </div>
    )
}

export default ContentHeader


