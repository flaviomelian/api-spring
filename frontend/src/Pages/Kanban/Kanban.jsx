import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './Kanban.css';
import { deleteTask, getAllTasksByProject } from '../../services/services';
import TaskCard from '../../Components/TaskCard/TaskCard';  // Importamos el componente de TaskCard
import { useDrop } from 'react-dnd';

const Kanban = () => {
    const location = useLocation();
    const project = location.state?.project;
    const [tasks, setTasks] = useState([]);
    const [progressTasks, setProgressTasks] = useState([]);
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

    // Funciones para manejar el drop
    const handleDrop = (taskId, column) => {
        const task = tasks.find((task) => task.id === taskId);
        if (column === 'En progreso') {
            setProgressTasks([...progressTasks, task]);
            setTasks(tasks.filter(t => t.id !== taskId));
        } else if (column === 'Hecho') {
            setDoneTasks([...doneTasks, task]);
            setProgressTasks(progressTasks.filter(t => t.id !== taskId));
        }
    };

    const [, dropToDo] = useDrop(() => ({
        accept: 'TASK',
        drop: (item) => handleDrop(item.id, 'En progreso'),
    }));

    const [, dropInProgress] = useDrop(() => ({
        accept: 'TASK',
        drop: (item) => handleDrop(item.id, 'Hecho'),
    }));

    return (
        <div className='kanban'>
            <div className='header-kanban'>
                <div ref={dropToDo} className='to-do kanban-section'>
                    <div className='header-buttton'>
                        <h1 className='kanban-section-header'>Por hacer</h1>
                        <button className='kanban-button' onClick={() => navigate("/create-task", { state: { project } })}> + </button>
                    </div>
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} onRequestDelete={() => setTaskToDelete(task)} />
                    ))}
                </div>

                <div ref={dropInProgress} className='progress kanban-section'>
                    <h1 className='kanban-section-header'>En progreso</h1>
                    {progressTasks.map((task) => (
                        <TaskCard key={task.id} task={task} onRequestDelete={() => setTaskToDelete(task)} />
                    ))}
                </div>

                <div className='review kanban-section'>
                    <h1 className='kanban-section-header'>En revisión</h1>
                </div>

                <div className='done kanban-section'>
                    <h1 className='kanban-section-header'>Hecho</h1>
                    {doneTasks.map((task) => (
                        <TaskCard key={task.id} task={task} onRequestDelete={() => setTaskToDelete(task)} />
                    ))}
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
