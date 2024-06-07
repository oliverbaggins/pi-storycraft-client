import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import NewProject from './NewProject'
import './HomePage.css'
import UserDropdown from './UserDropdown'

const Home = () => {
    const [user, setUser] = useState(null)
    const [activeProjectId, setActiveProjectId] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    return (
        <div className="home-container">
            <div className="sidebar-container">
            <Sidebar  activeProjectId={activeProjectId} setActiveProjectId={setActiveProjectId}/>
            </div>
            <div className="content-container">
                <NewProject />
            </div>
            <div className="content-container2">
                {user && <UserDropdown user={user} />}
            </div>
        </div>
    )
}

export default Home
