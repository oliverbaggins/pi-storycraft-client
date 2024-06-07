import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import './UserStoryForm.css';

const UserStoryForm = ({ projectDetails }) => {
  const [formData, setFormData] = useState({
    projectId: projectDetails._id,
    userType: '',
    userGoal: '',
    userChallenge: '',
    userAction: '',
    userMotivation: '',
    acceptanceCriteria: '',
    technicalRequirements: '',
    priority: '',
    additionalNotes: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const labels = {
    userType: 'Tipo de Usuário',
    userGoal: 'Objetivos do Usuário',
    userChallenge: 'Desafios do Usuário',
    userAction: 'Ação do Usuário',
    userMotivation: 'Motivação',
    acceptanceCriteria: 'Critérios de Aceitação',
    technicalRequirements: 'Requisitos Técnicos ou Restrições',
    priority: 'Prioridade',
    additionalNotes: 'Notas Adicionais'
  };

  const placeholders = {
    userGoal: 'Quais são os principais objetivos dos seus usuários ao usar o sistema?',
    userChallenge: 'Quais desafios os usuários enfrentam atualmente?',
    userAction: 'Descreva a ação que o usuário deseja realizar.',
    userMotivation: 'Por que o usuário quer realizar essa ação?',
    acceptanceCriteria: 'Quais critérios devem ser atendidos para considerar esta história como concluída com sucesso?',
    technicalRequirements: 'Existem requisitos técnicos ou restrições específicas que devem ser consideradas?',
    additionalNotes: 'Há alguma outra informação que você gostaria de adicionar?'
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
      console.error('Usuário não autenticado');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://pi-storycraft-server.onrender.com/api/user-stories', {
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

      navigate(`/user-stories/${projectDetails._id}`, { state: { projectDetails } });
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }

    setFormData({
      projectId: projectDetails._id,
      userType: '',
      userGoal: '',
      userChallenge: '',
      userAction: '',
      userMotivation: '',
      acceptanceCriteria: '',
      technicalRequirements: '',
      priority: '',
      additionalNotes: ''
    });
  };

  const handleNavigate = () => {
    navigate('/', { state: { projectDetails } });
  };

  return (
    <div className="container">
      <div className="right-pane">
        <h1 className='newTitle'>{projectDetails.project}</h1>
        {isLoading ? (
          <div className="loading-container">
            <TailSpin
              height="50"
              width="50"
              color="#3852FF"
              ariaLabel="loading"
            />
            <p>Gerando História de Usuário</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className='perguntaShort'>
              <p>{projectDetails.description}</p>
            </div>
            <div className='pergunta'>
              <label>{labels.userType}:</label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
              >
                <option value="">Quem são os principais usuários do seu sistema?</option>
                <option value="usuário final">Usuário Final</option>
                <option value="administrador">Administrador</option>
                <option value="desenvolvedor">Desenvolvedor</option>
                <option value="cliente">Cliente</option>
              </select>
            </div>
            <div className='pergunta'>
              <label>{labels.userGoal}:</label>
              <textarea
                name="userGoal"
                value={formData.userGoal}
                onChange={handleInputChange}
                placeholder={placeholders.userGoal}
              />
            </div>
            <div className='pergunta'>
              <label>{labels.userChallenge}:</label>
              <textarea
                name="userChallenge"
                value={formData.userChallenge}
                onChange={handleInputChange}
                placeholder={placeholders.userChallenge}
              />
            </div>
            <div className='pergunta'>
              <label>{labels.userAction}:</label>
              <textarea
                name="userAction"
                value={formData.userAction}
                onChange={handleInputChange}
                placeholder={placeholders.userAction}
              />
            </div>
            <div className='pergunta'>
              <label>{labels.userMotivation}:</label>
              <textarea
                name="userMotivation"
                value={formData.userMotivation}
                onChange={handleInputChange}
                placeholder={placeholders.userMotivation}
              />
            </div>
            <div className='pergunta'>
              <label>{labels.acceptanceCriteria}:</label>
              <textarea
                name="acceptanceCriteria"
                value={formData.acceptanceCriteria}
                onChange={handleInputChange}
                placeholder={placeholders.acceptanceCriteria}
              />
            </div>
            <div className='pergunta'>
              <label>{labels.technicalRequirements}:</label>
              <textarea
                name="technicalRequirements"
                value={formData.technicalRequirements}
                onChange={handleInputChange}
                placeholder={placeholders.technicalRequirements}
              />
            </div>
            <div className='pergunta'>
              <label>{labels.priority}:</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
              >
                <option value="">Qual é a prioridade desta história?</option>
                <option value="urgente">Urgente</option>
                <option value="alta">Alta</option>
                <option value="média">Média</option>
                <option value="baixa">Baixa</option>
              </select>
            </div>
            <div className='pergunta'>
              <label>{labels.additionalNotes}:</label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                placeholder={placeholders.additionalNotes}
              />
            </div>
            <button className='botao-3' type="submit">Gerar História de Usuário</button>
            <button className='botao-4' type="submit" onClick={handleNavigate}>Cancelar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserStoryForm;
