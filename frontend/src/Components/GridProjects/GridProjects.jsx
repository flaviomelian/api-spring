import React, { useState, useEffect } from 'react';
import { getAllProjects } from '../../services/services';
import './GridProjects.css';

const GridProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getAllProjects();
        console.log(result);
        
        setProjects(result);
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
      }
    };

    fetchProjects();
  }, []); // Ejecutar solo una vez al montar el componente

  return (
    <div>
      <h1 className='grid-projects-header'>Proyectos</h1>
      <div className='grid-projects' onClick={() => navigate()}>
        {projects.map((project, index) => (
        <div key={index} className='project-card'>
          {/* Personaliza lo que se muestra */}
          <h3>{project.name}</h3>
          <p>{project.deadline}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default GridProjects;

