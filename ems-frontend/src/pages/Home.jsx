import React from 'react'
import Layout from '../components/layout/Layout.jsx'

const Home = () => {
    const username = localStorage.getItem('username')
    return (
        <Layout>
            <h1>
                welcome { username } !
            </h1>
        </Layout>

    )
}

export default Home