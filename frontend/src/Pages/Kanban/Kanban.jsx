import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './Kanban.css';
import { deleteTask, getAllTasksByProject } from '../../services/services';
import TaskCard from '../../Components/TaskCard/TaskCard';  // Importamos el componente de TaskCard

const Kanban = () => {
    const location = useLocation();
    const project = location.state?.project;
    const [tasks, setTasks] = useState([]);               
    const [progressTasks, setProgressTasks] = useState([]); 
    const [revisionTasks, setRevisionTasks] = useState([]); 
    const [doneTasks, setDoneTasks] = useState([]);        
    const [taskToDelete, setTaskToDelete] = useState(null);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
        setProgressTasks((prev) => prev.filter((t) => t.id !== id));
        setDoneTasks((prev) => prev.filter((t) => t.id !== id));
        setTaskToDelete(null);
        deleteTask(id)
    };
    

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const result = await getAllTasksByProject(project.id);
                setTasks(result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTasks();
    }, [project]);

    const moveTask = async (task, direction) => {
    
        // Clonamos la tarea para no modificar el objeto directamente
        let updatedTask = { ...task };
    
        // Mover hacia la izquierda
        if (direction === 'left') {
            if (task.status === 'progress') {
                updatedTask.status = 'tasks';
                setProgressTasks((prev) => prev.filter(t => t.id !== task.id));  // Eliminar de 'progress'
                setTasks((prev) => [...prev, updatedTask]);  // Agregar a 'tasks'
            } else if (task.status === 'in_revission') {
                updatedTask.status = 'progress';
                setRevisionTasks((prev) => prev.filter(t => t.id !== task.id));  // Eliminar de 'in_revission'
                setProgressTasks((prev) => [...prev, updatedTask]);  // Agregar a 'progress'
            } else if (task.status === 'done') {
                updatedTask.status = 'in_revission';
                setDoneTasks((prev) => prev.filter(t => t.id !== task.id));  // Eliminar de 'done'
                setRevisionTasks((prev) => [...prev, updatedTask]);  // Agregar a 'in_revission'
            }
        }
        // Mover hacia la derecha
        else if (direction === 'right') {
            if (task.status === 'tasks') {
                updatedTask.status = 'progress';
                setTasks((prev) => prev.filter(t => t.id !== task.id));  // Eliminar de 'tasks'
                setProgressTasks((prev) => [...prev, updatedTask]);  // Agregar a 'progress'
            } else if (task.status === 'progress') {
                updatedTask.status = 'in_revission';
                setProgressTasks((prev) => prev.filter(t => t.id !== task.id));  // Eliminar de 'progress'
                setRevisionTasks((prev) => [...prev, updatedTask]);  // Agregar a 'in_revission'
            } else if (task.status === 'in_revission') {
                updatedTask.status = 'done';
                setRevisionTasks((prev) => prev.filter(t => t.id !== task.id));  // Eliminar de 'in_revission'
                setDoneTasks((prev) => [...prev, updatedTask]);  // Agregar a 'done'
            }
        }
    };    

    return (
        <div className='kanban'>
            <div className='header-kanban'>
            <div className='to-do kanban-section'>
                <div className='header-buttton'>
                    <h1 className='kanban-section-header'>Por hacer</h1>
                    <button className='kanban-button' onClick={() => navigate("/create-task", { state: { project } })}> + </button>
                </div>
                <div className='tasks'>
                    {tasks.map((task) => (
                        <TaskCard 
                            key={task.id} 
                            task={task} 
                            onRequestDelete={() => setTaskToDelete(task)} 
                            onMoveLeft={() => moveTask(task, 'left')} 
                            onMoveRight={() => moveTask(task, 'right')} 
                        />
                    ))}
                </div>
                
            </div>

            <div className='progress kanban-section'>
                <h1 className='kanban-section-header'>En progreso</h1>
                <div className='tasks'></div>
                    {progressTasks.map((task) => (
                        <TaskCard 
                            key={task.id} 
                            task={task} 
                            onRequestDelete={() => setTaskToDelete(task)} 
                            onMoveLeft={() => moveTask(task, 'left')} 
                            onMoveRight={() => moveTask(task, 'right')} 
                        />
                    ))}
            </div>

            <div className='review kanban-section'>
                <h1 className='kanban-section-header'>En revisión</h1>
                <div className='tasks'></div>
                    {revisionTasks.map((task) => (
                        <TaskCard 
                            key={task.id} 
                            task={task} 
                            onRequestDelete={() => setTaskToDelete(task)} 
                            onMoveLeft={() => moveTask(task, 'left')} 
                            onMoveRight={() => moveTask(task, 'right')} 
                        />
                    ))}
            </div>

            <div className='done kanban-section'>
                <h1 className='kanban-section-header'>Hecho</h1>
                <div className='tasks'>
                    {doneTasks.map((task) => (
                        <TaskCard 
                            key={task.id} 
                            task={task} 
                            onRequestDelete={() => setTaskToDelete(task)} 
                            onMoveLeft={() => moveTask(task, 'left')} 
                            onMoveRight={() => moveTask(task, 'right')}
                        />
                    ))}
                </div>
                
            </div>

            </div>
            {taskToDelete && (
            <div className="modal-backdrop">
                <div className="modal">
                    <h2>¿Está seguro de que desea eliminar la tarea "{taskToDelete.content}"?</h2>
                    <div className="modal-buttons">
                        <button className='cancel' onClick={() => setTaskToDelete(null)}>↩️ Cancelar</button>
                        <button className='delete-modal' onClick={() => handleDelete(taskToDelete.id)}>❌ Eliminar</button>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default Kanban;
