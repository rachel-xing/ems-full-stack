import React from 'react'

const Home = () => {
    const username = localStorage.getItem('username')
    return (
        <h1>
            welcome {username} !
        </h1>

    )
}

export default Home