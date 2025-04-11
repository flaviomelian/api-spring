import React from 'react';
import './TaskCard.css';  // Asegúrate de tener estilos para el TaskCard
import { Link } from 'react-router-dom';
import pen from '../../assets/pen.png';  // Asegúrate de tener la imagen en la ruta correcta

const ItemType = 'TASK';

const TaskCard = ({ task, onRequestDelete, onMoveLeft, onMoveRight }) => {
    return (
        <div className='task-card'>
            <div className='task-card-header'>
                <h2>{task.content}</h2>
                <div className='task-card-labels'>
                    <p>Prioridad: {task.priority}</p>
                    <p>Días estimados: {task.time}</p>
                    <p>Asignado a: {task.assignedTo}</p>
                </div>
            </div>
            <div className='task-card-footer'>
                <button className='kanban-button delete' onClick={onRequestDelete}>❌</button>
                <Link to='/create-task' state={{ task: task, project: task.project }}><img className='pen' src={pen} alt="Editar" /></Link>
                {onMoveLeft && <button className='arrow' onClick={onMoveLeft}>⬅️</button>}
                {onMoveRight && <button className='arrow' onClick={onMoveRight}>➡️</button>}
            </div>
        </div>
    );
};

export default TaskCard;
