import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UserStoryForm.css';

const ProjectDetails = () => {
  const location = useLocation();
  const { projectDetails } = location.state;
  const navigate = useNavigate();

  const handleStartProject = () => {
    navigate('/new-project', { state: { projectDetails } });
  };

  const handleNavigate = () => {
    navigate(`/user-stories/${projectDetails._id}`, { state: { projectDetails } });
  };

  const handleNavigate2 = () => {
    navigate('/new-new-project', { state: { projectDetails } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Usuário não autenticado');
      return;
    }

  };

  return (
    <div className="container">
      <div className="right-pane">
        <h1 className='newTitle'>{projectDetails.project}</h1>
        <form onSubmit={handleSubmit}>
          <div className='pergunta'>
            <p>{projectDetails.description}</p>
          </div>
          {projectDetails.userStoriesId && projectDetails.userStoriesId.length > 0 ? (
            <button className='botao-3' type="button" onClick={handleNavigate}>Mostrar Histórias do Projeto</button>
          ) : (
            <button className='botao-3' type="submit" onClick={handleStartProject}>Começar Projeto</button>
          )}
          <button className='botao-4' type="submit" onClick={handleNavigate2}>Criar Novo Projeto</button>
        </form>
      </div>
    </div>
  );
};

export default ProjectDetails;
