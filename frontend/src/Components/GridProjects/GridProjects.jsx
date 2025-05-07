import React, { useState, useEffect } from 'react';
import { getAllProjects } from '../../services/services';
import './GridProjects.css';
import { useNavigate } from 'react-router-dom';

/**
 * GridProjects
 * 
 * Este componente muestra un grid de tarjetas con proyectos.
 * 
 * 🔁 Llama a `getAllProjects()` al montarse y lista los proyectos obtenidos.
 * 🧭 Usa `useNavigate()` de React Router para ir a la vista de detalle del proyecto.
 * 
 * - Muestra nombre y fecha límite del proyecto.
 * - Al hacer click en una tarjeta, redirige a `/kanban` con el estado del proyecto.
 * 
 * @component
 */

const GridProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate()


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
      <div className='grid-projects'>
        {projects.map((project, index) => (
        <div key={index} className='project-card' onClick={() => navigate('kanban', { state: { project } })}>
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

