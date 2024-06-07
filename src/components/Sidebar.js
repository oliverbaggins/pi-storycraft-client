import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../Assets/Logo.svg";
import axios from 'axios';
import './Sidebar.css';

const Sidebar = ({ projects }) => {
  const [projectList, setProjectList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('https://pi-storycraft-server.onrender.com/api/user-stories/all-projects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setProjectList(response.data);
        setIsLoggedIn(true);
      })
      .catch(error => console.error('Error fetching projects:', error));
    }
  }, [projects]);

  const handleProjectClick = async (projectId) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(`https://pi-storycraft-server.onrender.com/api/user-stories/project/${projectId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        navigate(`/project/${projectId}`, { state: { projectDetails: response.data } });
        setIsSidebarOpen(false); // Fecha o sidebar ao clicar em um item da lista
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    }
  };

  return (
    <>
      <button className='sidebar-toggle' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? 'Fechar Sidebar' : 'Abrir Sidebar'}
      </button>
      <div className={`sidebar-inside ${isSidebarOpen ? 'open' : ''}`}>
        <Link to="/" className='Logo-link'>
          <div className='Logo'>
            <img className='logoIgm' src={Logo} alt='Logo'/>
          </div>
        </Link>
        {isSidebarOpen && (
          <button className='sidebar-close' onClick={() => setIsSidebarOpen(false)}>
            Fechar Sidebar
          </button>
        )}
        {isLoggedIn ? (
          <div className='projects'>
            {projectList.length > 0 ? (
              <ul>
                {projectList.map((project) => (
                  <li key={project._id} onClick={() => handleProjectClick(project._id)}>
                    {project.project}
                  </li>
                ))}
              </ul>
            ) : (
              <p className='textProjects'>Ainda não há projetos disponíveis. Comece criando um novo projeto.</p>
            )}
          </div>
        ) : (
          <div className='meio-baixo'>
            <div className='Texto'>
              <p className='Titulo-Texto'>Faça login ou crie sua conta</p>
              <p className='texto-Texto'>Crie projetos, guarde e edite suas histórias de usuário.</p>
            </div>
            <div className='Botoes'>
              <Link to="/login">
                <button className='botão-1'>Fazer Login</button>
              </Link>
              <Link to="/signup">
                <button className='botão-2'>Criar conta</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar;
