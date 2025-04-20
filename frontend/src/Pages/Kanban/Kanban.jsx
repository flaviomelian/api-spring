import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './Kanban.css';
import { deleteTask, getAllTasksByProject, updateStatusTask } from '../../services/services';
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

    const handleNavigateToReport = () => {
        localStorage.setItem('project', JSON.stringify(project));
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('progressTasks', JSON.stringify(progressTasks));
        localStorage.setItem('revisionTasks', JSON.stringify(revisionTasks));
        localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
    
        navigate("/report");
    };
    

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
    
                const tasksByStatus = {
                    0: [], // Por hacer
                    1: [], // En progreso
                    2: [], // En revisión
                    3: []  // Hechas
                };
    
                result.forEach(task => {
                    tasksByStatus[task.status]?.push(task);
                });
    
                setTasks(tasksByStatus[0]);
                setProgressTasks(tasksByStatus[1]);
                setRevisionTasks(tasksByStatus[2]);
                setDoneTasks(tasksByStatus[3]);
    
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchTasks();
    }, [project]);
    
    const moveTask = async (task, direction) => {
        console.log("Move task:", task.id, direction);
        // Mover hacia la izquierda
        if (direction === 'left') {
            task.status--;
            if (task.status === 0) {
                setProgressTasks((prev) => prev.filter(t => t.id !== task.id));  // Eliminar de 'progress'
                setTasks((prev) => [...prev, task]);  // Agregar a 'tasks'
            } else if (task.status === 1) {
                setRevisionTasks((prev) => prev.filter(t => t.id !== task.id));  // Eliminar de 'in_revission'
                setProgressTasks((prev) => [...prev, task]);  // Agregar a 'progress'
            } else if (task.status === 2) {
                setDoneTasks((prev) => prev.filter(t => t.id !== task.id));  // Eliminar de 'done'
                setRevisionTasks((prev) => [...prev, task]);  // Agregar a 'in_revission'
            }
        }
        // Mover hacia la derecha
        else if (direction === 'right') {
            task.status++
            if (task.status === 1) {
                setTasks((prev) => prev.filter(t => t.id !== task.id));  // Eliminar de 'tasks'
                setProgressTasks((prev) => [...prev, task]);  // Agregar a 'progress'
            } else if (task.status === 2) {
                setProgressTasks((prev) => prev.filter(t => t.id !== task.id));  // Eliminar de 'progress'
                setRevisionTasks((prev) => [...prev, task]);  // Agregar a 'in_revission'
            } else if (task.status === 3) {
                setRevisionTasks((prev) => prev.filter(t => t.id !== task.id));  // Eliminar de 'in_revission'
                setDoneTasks((prev) => [...prev, task]);  // Agregar a 'done'
            }
        }
    
        // Aquí puedes enviar la actualización al backend si es necesario
        try {
            console.log(task)
            await updateStatusTask(task.id, task);
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
        }
    };
        

    return (
        <div className='kanban'>
            <button className='btn btn-primary clean report' onClick={handleNavigateToReport}>Informe del proyecto</button>
            <div className='header-kanban'>
                <div className='to-do kanban-section'>
                    <div className='header-buttton'>
                        <h2 className='kanban-section-header'>Por hacer</h2>
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
                    <h2 className='kanban-section-header'>En progreso</h2>
                    <div className='tasks'>
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
                </div>

                <div className='review kanban-section'>
                    <h2 className='kanban-section-header'>En revisión</h2>
                    <div className='tasks'>
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
                </div>

                <div className='done kanban-section'>
                    <h2 className='kanban-section-header'>Hecho</h2>
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
