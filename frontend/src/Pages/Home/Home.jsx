import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // si quieres estilos separados

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className='welcome'>👋 Bienvenido al Gestor de Proyectos</h1>
        <p className="description">
          <b>
            Esta aplicación te permite organizar tus proyectos de forma visual, colaborativa y eficiente.
            Crea tareas, asígnalas a tu equipo y sigue su progreso en tiempo real con un tablero Kanban dinámico.
          </b>
        </p>

        <ul className="features-list">
          <li>📌 Crea y organiza tareas por prioridad</li>
          <li>👥 Asigna tareas a diferentes miembros del equipo</li>
          <li>📊 Visualiza el flujo de trabajo con un tablero Kanban</li>
          <li>✏️ Edita y elimina tareas fácilmente</li>
          <li>🚀 Mantén el control de tus proyectos de principio a fin</li>
        </ul>

        <div className="home-actions">
          <button className="home-button" onClick={() => navigate('/create-project')}>
            + Crear nuevo proyecto
          </button>
          <button className="home-secondary" onClick={() => navigate('/projects')}>
            Ver proyectos existentes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
