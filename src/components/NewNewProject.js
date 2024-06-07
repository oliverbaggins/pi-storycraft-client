// NewNewProjectPage.js
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import UserDropdown from './UserDropdown'
import NewProjectForm from './NewProjectForm';

const NewNewProjectPage = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
        setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <div className='home-container'>
      <div className ='sidebar-container'>
        <Sidebar />
      </div>
      <div className='content-container'>
        <NewProjectForm />
      </div>
      <div className = 'content-container2'>
        {user && <UserDropdown user={user} />}
      </div>
    </div>
  );
};

export default NewNewProjectPage;
