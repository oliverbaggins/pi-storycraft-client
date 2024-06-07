import React, { useEffect, useState } from 'react';
import UserStoryForm from './UserStoryForm';
import Sidebar from './Sidebar';
import UserDropdown from './UserDropdown'
import { useLocation } from 'react-router-dom';

const NewProjectPage = () => {
  const location = useLocation();
  const projectDetails = location.state ? location.state.projectDetails : null;
  console.log(projectDetails._id)
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
        {projectDetails && <UserStoryForm projectDetails={projectDetails} />}
      </div>
      <div className = 'content-container2'>
        {user && <UserDropdown user={user} />}
      </div>
    </div>
  );
};

export default NewProjectPage;
