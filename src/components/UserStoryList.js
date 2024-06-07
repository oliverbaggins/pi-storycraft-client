import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toastStyles.css';
import UserStoryItem from './UserStoryItem';
import Sidebar from './Sidebar';
import './UserStoryList.css';
import UserDropdown from './UserDropdown';

const UserStoryList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const projectDetails = location.state ? location.state.projectDetails : {};
  console.log(projectDetails._id);
  const [userStories, setUserStories] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleNavigate = () => {
    navigate('/new-project', { state: { projectDetails } });
  };

  const handleNavigate2 = () => {
    navigate('/', { state: { projectDetails } });
  };

  useEffect(() => {
    const fetchUserStories = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Usuário não autenticado');
          return;
        }

        const response = await fetch(`https://pi-storycraft-server.onrender.com/api/user-stories/project-stories/${projectDetails._id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Erro: ${response.status} - ${errorData.message || 'Erro identificado'}`);
        }

        const result = await response.json();
        setUserStories(result.stories);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserStories();
  }, [projectDetails._id]);

  const deleteUserStory = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Usuário não autenticado');
        return;
      }

      const response = await fetch(`https://pi-storycraft-server.onrender.com/api/user-stories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro: ${response.status} - ${errorData.message || 'Erro identificado'}`);
      }

      setUserStories(userStories.filter(story => story.storyId !== id));
      toast.success('História deletada com sucesso!');
    } catch (error) {
      console.error(error.message);
    }
  };

  const editUserStory = async (id, newStoryData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Usuário não autenticado');
        return;
      }

      const data = { userStory: newStoryData };

      const response = await fetch(`https://pi-storycraft-server.onrender.com/api/user-stories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro: ${response.status} - ${errorData.message || 'Erro identificado'}`);
      }

      setUserStories(userStories.map(story => (story.storyId === id ? { ...story, stories: newStoryData } : story)));
      toast.success('História editada com sucesso!');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='home-container'>
      <div className='sidebar-container'>
        <Sidebar />
      </div>
      <div className='content-container'>
        <div className='scroll-container'>
          {userStories.length === 0 ? (
              <p className='textNoStory'>Parece que você ficou sem histórias para contar, vá em frente e crie mais algumas!</p>
          ) : (
            userStories.map(story => (
              <UserStoryItem
                key={story.storyId}
                story={story}
                editUserStory={(newStoryData) => editUserStory(story.storyId, newStoryData)}
                deleteUserStory={() => deleteUserStory(story.storyId)}
              />
            ))
          )}
          <div className='btnList'>
            <button className='botao-L1' type="submit" onClick={handleNavigate}>Gerar Nova História</button>
            <button className='botao-L2' type="submit" onClick={handleNavigate2}>Voltar Para o Ínicio</button>
          </div>
        </div>
        <div className='content-container2'>
          {user && <UserDropdown user={user} />}
        </div>
      </div>
      <ToastContainer className="custom-toast-container" />
    </div>
  );
};

export default UserStoryList;
