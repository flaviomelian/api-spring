import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../Context/Context'; // Importamos el contexto
import { createUser } from '../../services/services';

const CreateDevOK = () => {
  const navigate = useNavigate();
  const { userData } = useUserContext(); // Obtenemos los datos del usuario del contexto

  const handleCreateUser = async () => {
    try {
      await createUser(userData); // Crear el usuario con los datos del contexto
      navigate('/team'); // Redirigir al equipo
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Confirmar creación de usuario</h1>
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
      <button onClick={handleCreateUser}>Confirmar</button>
      <button onClick={() => navigate('/create-dev')}>Cancelar</button>
    </div>
  );
};

export default CreateDevOK;
