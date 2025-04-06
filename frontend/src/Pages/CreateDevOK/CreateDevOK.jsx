import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserContext } from '../../Context/Context'; // Importamos el contexto
import { createUser, updateUser } from '../../services/services';
import './CreateDevOK.css';

const CreateDevOK = () => {

  const navigate = useNavigate();
  const { userData } = useUserContext();
  const location = useLocation();
  const isEditMode = location.state;  

  const handleCreateUser = async () => {
    try {
      await createUser(userData);
      navigate('/team'); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUser(userData.id, userData);
      navigate('/team'); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='create-dev-ok'>
      {isEditMode ? (<h1>Confirmar edición de usuario</h1>) : (<h1>Confirmar creación de usuario</h1>)}
      {userData && (
        <div>
          <p><b>Usuario:</b> {userData.username}</p>
          <p><b>Nombre:</b> {userData.name}</p>
          <p><b>Apellidos:</b> {userData.surnames}</p>
          <p><b>Salario:</b> {userData.salary} €</p>
          <p><b>Email:</b> {userData.email}</p>
          <p><b>Rol:</b> {userData.role}</p>
        </div>
      )}
      <div className='confirmation-buttons'>
        <button className="btn success" onClick={isEditMode ? handleUpdateUser : handleCreateUser}>Confirmar</button>
        <button className="btn danger" onClick={() => navigate('/create-dev')}>Cancelar</button>
      </div>
    </div>
  );
};

export default CreateDevOK;
