import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserStoryForm.css';
import { TailSpin } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toastStyles.css';

const NewProjectForm = () => {
  const [formData, setFormData] = useState({
    project: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const labels = {
    project: 'Nome do Projeto',
    description: 'Descrição do Projeto',
  };

  const placeholders = {
    project: 'Digite o nome do projeto',
    description: 'Digite a descrição do projeto',
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Você precisa estar logado para criar um projeto. Por favor, clique em Abrir Sidebar e faça login ou crie uma conta.');
      console.error('Usuário não autenticado');
      return;
    }

    setIsLoading(true); // Iniciar carregamento
    try {
      // Requisição para criar o projeto
      const response = await fetch('https://pi-storycraft-server.onrender.com/api/user-stories/new-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro: ${response.status} - ${errorData.message || 'Erro identificado'}`);
      }

      const newProject = await response.json();
      console.log('Novo projeto criado:', newProject);

      const projectId = newProject._id;
      if (!projectId) {
        throw new Error('ID do projeto não encontrado na resposta');
      }

      // Requisição para obter detalhes do projeto
      const projectResponse = await fetch(`https://pi-storycraft-server.onrender.com/api/user-stories/project/${projectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!projectResponse.ok) {
        const errorData = await projectResponse.json();
        throw new Error(`Erro: ${projectResponse.status} - ${errorData.message || 'Erro identificado'}`);
      }

      const projectDetails = await projectResponse.json();
      console.log('Detalhes do projeto:', projectDetails);

      // Redirecionar para a página de detalhes do projeto com os dados do projeto
      navigate(`/project/${projectId}`, { state: { projectDetails } });
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false); // Parar carregamento
      setFormData({
        project: '',
        description: '',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <TailSpin
          height="50"
          width="50"
          color="#3852FF"
          ariaLabel="loading"
        />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="right-pane">
        <h1 className='newTitle'>Novo Projeto</h1>
          <form onSubmit={handleSubmit}>
            <div className='pergunta'>
              <label>{labels.project}:</label>
              <input
                name="project"
                value={formData.project}
                onChange={handleInputChange}
                placeholder={placeholders.project}
              />
            </div>
            <div className='pergunta'>
              <label>{labels.description}:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder={placeholders.description}
              />
            </div>
            <button className='botao-3' type="submit">Criar Projeto</button>
          </form>
      </div>
      <ToastContainer className="custom-toast-container" />
    </div>
  );
};

export default NewProjectForm;
