import React from 'react';
import './TaskCard.css';  // Asegúrate de tener estilos para el TaskCard
import { Link } from 'react-router-dom';
import pen from '../../assets/pen.png';  // Asegúrate de tener la imagen en la ruta correcta

/**
 * Componente `TaskCard` para mostrar información de una tarea en un tablero Kanban.
 * 
 * Este componente se utiliza para mostrar los detalles de una tarea, como su contenido, prioridad,
 * días estimados y el nombre del proyecto al que pertenece. También proporciona botones para eliminar,
 * editar y mover la tarea entre diferentes columnas del tablero Kanban.
 * 
 * @component
 * @example
 * // Ejemplo de uso
 * <TaskCard
 *   task={taskData}
 *   onRequestDelete={handleDelete}
 *   onMoveLeft={handleMoveLeft}
 *   onMoveRight={handleMoveRight}
 * />
 * 
 * @param {Object} task - La tarea que se va a mostrar en la tarjeta.
 * @param {Object} task.content - El contenido o descripción de la tarea.
 * @param {string} task.priority - La prioridad de la tarea (baja, media, alta).
 * @param {number} task.time - El número de días estimados para completar la tarea.
 * @param {Object} task.project - El proyecto al que pertenece la tarea.
 * @param {Function} onRequestDelete - Función que se ejecuta cuando se solicita eliminar la tarea.
 * @param {Function} onMoveLeft - Función que se ejecuta para mover la tarea hacia la izquierda (anterior).
 * @param {Function} onMoveRight - Función que se ejecuta para mover la tarea hacia la derecha (siguiente).
 * @returns {React.Element} El componente `TaskCard` que renderiza una tarjeta de tarea.
 */

const ItemType = 'TASK';

const TaskCard = ({ task, onRequestDelete, onMoveLeft, onMoveRight }) => {
    return (
        <div className='task-card'>
            <div className='task-card-header'>
                <h2>{task.content}</h2>
                <div className='task-card-labels'>
                    <p>Prioridad: {task.priority}</p>
                    <p>Días estimados: {task.time}</p>
                    <p><b>{task.project.name}</b></p>
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
