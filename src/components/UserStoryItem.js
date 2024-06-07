import React, { useState } from 'react';
import './UserStoryItem.css';

const UserStoryItem = ({ story, editUserStory, deleteUserStory }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStory, setEditedStory] = useState(story.stories);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editUserStory(editedStory);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedStory(story.stories);
    setIsEditing(false);
  };

  return (
    <div className="historias-usuario">
      {isEditing ? (
        <div className="editing-container">
          <textarea
            value={editedStory}
            onChange={(e) => setEditedStory(e.target.value)}
          />
          <div className="button-container">
            <button className="button3" onClick={handleSave}>Salvar</button>
            <button className="button4" onClick={handleCancel}>Cancelar</button>
          </div>
        </div>
      ) : (
        <div className="historia">
          <p className="numero">{story.storyIndex}</p>
          <p className="textao">{story.stories}</p>
          <div className="buttons">
            <button className="button" onClick={handleEdit}>Editar</button>
            <button className="button2" onClick={() => deleteUserStory(story.storyId)}>Deletar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserStoryItem;
