import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTaskContext } from '../../Context/Context'; // Importamos el contexto
import { createTask, updateTask } from '../../services/services';

const CreateTaskOK = () => {

  const navigate = useNavigate();
  const { taskData } = useTaskContext();
  const location = useLocation();
  const isEditMode = location.state;

  const handleCreateTask = async () => {
    try {
      await createTask(taskData);
      navigate('/team'); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTask = async () => {
    try {
      await updateTask(taskData.id, taskData);
      navigate('/team'); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isEditMode ? (<h1>Confirmar edición de tarea</h1>) : (<h1>Confirmar creación de tarea</h1>)}
      {taskData && (
        <div>
          <p><b>Usuario:</b> {taskData.taskname}</p>
          <p><b>Nombre:</b> {taskData.name}</p>
          <p><b>Apellidos:</b> {taskData.surnames}</p>
          <p><b>Salario:</b> {taskData.salary} €</p>
          <p><b>Email:</b> {taskData.email}</p>
          <p><b>Rol:</b> {taskData.role}</p>
        </div>
      )}
      <button onClick={isEditMode ? handleUpdateTask : handleCreateTask}>Confirmar</button>
      <button onClick={() => navigate('/create-dev')}>Cancelar</button>
    </div>
  );
};

export default CreateTaskOK;
