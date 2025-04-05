import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProjectContext } from '../../Context/Context'; // Importamos el contexto
import { createProject, updateProject } from '../../services/services';

const CreateProjectOK = () => {

  const navigate = useNavigate();
  const { projectData } = useProjectContext();
  const location = useLocation();
  const isEditMode = location.state;  

  const handleCreateproject = async () => {
    try {
      const formattedInitDate = formatDateForMySQL(projectData.initDate);
      const formattedDeadline = formatDateForMySQL(projectData.deadline);

      const dataToSend = { 
          ...projectData,
          initdate: formattedInitDate,
          deadline: formattedDeadline
      };

      console.log(dataToSend);
      

      await createProject(dataToSend);
      navigate('/projects'); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateproject = async () => {
    try {
      const formattedInitDate = formatDateForMySQL(projectData.initDate);
      const formattedDeadline = formatDateForMySQL(projectData.deadline);

      const dataToSend = { 
          ...projectData,
          initdate: formattedInitDate,
          deadline: formattedDeadline
      };
      await updateProject(dataToSend);
      navigate('/projects'); 
    } catch (error) {
      console.error(error);
    }
  };

  const formatDateForMySQL = (date) => {
    const [day, month, year] = date.split('-'); // Dividimos la fecha en día, mes y año
    return `${year}-${month}-${day}`; // Devolvemos en formato aaaa-mm-dd
  };
  

  return (
    <div>
      {isEditMode ? (<h1>Confirmar edición de proyecto</h1>) : (<h1>Confirmar creación de proyecto</h1>)}
      {projectData && (
        <div>
          <p><b>Proyecto:</b> {projectData.name}</p>
          <p><b>Empresa:</b> {projectData.enterprise}</p>
          <p><b>Fecha de inicio:</b> {projectData.initDate}</p>
          <p><b>Fecha de finalización:</b> {projectData.deadline}</p>
        </div>
      )}
      <button onClick={isEditMode ? handleUpdateproject : handleCreateproject}>Confirmar</button>
      <button onClick={() => navigate('/create-Project')}>Cancelar</button>
    </div>
  );
};

export default CreateProjectOK;
