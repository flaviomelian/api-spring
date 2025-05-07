/**
 * Componente `CreateTask` para la creación y edición de tareas dentro de un proyecto.
 * 
 * Este componente permite al usuario crear nuevas tareas o editar tareas existentes. Los campos del formulario incluyen 
 * el nombre de la tarea, la prioridad, el tiempo estimado en días, y los desarrolladores asignados. Además, el formulario 
 * tiene validación para asegurar que todos los campos sean completados correctamente antes de enviar la información.
 * 
 * La lógica de la aplicación incluye la obtención de datos de los desarrolladores y tareas a través de llamadas a servicios externos 
 * (usando las funciones `getAllUsers` y `getAllTasksByProject`). También permite manejar la edición de tareas previas, manteniendo 
 * el estado de los campos cuando el componente se renderiza en modo de edición.
 * 
 * @component
 * @example
 * Ejemplo de uso para crear una tarea
 * <CreateTask />
 * 
 * @returns {React.Element} El componente `CreateTask` que renderiza un formulario para crear o editar tareas dentro de un proyecto.
 */
import React, { useState, useEffect } from 'react';
import './CreateTaskComponent.css';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from "react-router-dom";
import { useTaskContext } from '../../Context/Context';
import taskimg from '../../assets/task.png';
import { getAllTasksByProject, getAllUsers } from '../../services/services';

const CreateTask = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { setTaskData }  = useTaskContext();
    const task = location.state?.task;
    const project = location.state?.project;
    const [content, setContent] = useState('');
    const [priority, setPriority] = useState('');
    const [time, setTime] = useState('');
    const [developers, setDevelopers] = useState([]);
    const [assignedDevelopers, setAssignedDevelopers] = useState([]);
    const [idDevelopers, setIdDevelopers] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);  

    /**
     * Efecto para cargar la información de la tarea cuando el proyecto cambia.
     */
    useEffect(() => {
        handleGetTaskInformation();
    }, [project]);

    /**
     * Efecto para cargar los desarrolladores cuando cambia la lista de desarrolladores.
     */
    useEffect(() => {
      handleGetDevelopersInformation();
    }, []);

    /**
     * Función para obtener la información de los desarrolladores disponibles.
     * Llama al servicio `getAllUsers`.
     */
    const handleGetDevelopersInformation = async () => {
        const result = await getAllUsers();
        console.log(result);
        setDevelopers(result);
    }

    /**
     * Función para obtener las tareas asociadas a un proyecto específico.
     * Llama al servicio `getAllTasksByProject`.
     */
    const handleGetTaskInformation = async () => {
        const result = await getAllTasksByProject(project.id);
        console.log(result);
    }

    /**
     * Efecto para inicializar los valores del formulario si el componente está en modo de edición.
     */
    useEffect(() => {
        if(task && !isEditMode){
            setIsEditMode(true);  
            setContent(task.content);
            setPriority(task.priority);
            setTime(task.time);
        }  
    }, [task, isEditMode]);

    /**
     * Función para manejar la creación o edición de la tarea.
     * Verifica que todos los campos sean completados antes de enviar la información.
     * Si está en modo edición, actualiza la tarea existente, de lo contrario crea una nueva.
     */
    const handleFormCreateTask = () => {
        
        if (
            content.length === 0 ||
            priority.length === 0 ||
            time.length === 0
        ) {
            return toast.error('Introduzca todos los campos del formulario correctamente');
        }
    
        try {
            const data = {
                id: task ? task.id : null,
                content,
                priority,
                time,
                projectId: project.id,
                projectName: project.name,
                users: assignedDevelopers,
                idDevelopers: idDevelopers,
                status: task ? task.status : 0
            };             
            console.log(data);
            setTaskData(data);
            isEditMode ? navigate('/create-task-ok', { state: true }) : navigate('/create-task-ok', { state: false });
        } catch (error) {
            toast.error('Error al crear o editar la tarea');
        }
    }

    // Renderiza el formulario de creación o edición de tarea
    return (
        <div className='team-dashboard'>
            <Toaster />
            
            <form id="taskForm">
                <div className='task-img-header'>
                    <img className='task' src={taskimg} alt="Task" />
                    <h1 id='title'>{isEditMode ? 'Edición de tarea' : 'Alta de tarea'}</h1>
                </div>
                {isEditMode ? 
                    (<input type="text" id="Taskname" name="Taskname" maxLength="25" placeholder='Tarea' value={content} onChange={(event) => setContent(event.target.value)} required/>) : 
                    (<input type="text" id="Taskname" name="Taskname" maxLength="25" placeholder='Nombre de la tarea' onChange={(event) => setContent(event.target.value)} required/>)
                }
                {isEditMode ? 
                    (<select id="role" name="priority" value={priority} onChange={(event) => setPriority(event.target.value)} required>
                        <option value="SELECT">Prioridad</option>
                        <option value="ALTA">Alta</option>
                        <option value="MEDIANA">Mediana</option>
                        <option value="BAJA">Baja</option>
                    </select>) :
                    (<select id="role" name="priority" onChange={(event) => setPriority(event.target.value)} required>
                        <option value="SELECT">Prioridad</option>
                        <option value="ALTA">Alta</option>
                        <option value="MEDIANA">Mediana</option>
                        <option value="BAJA">Baja</option>
                    </select>)
                }
                <label htmlFor="time">Tiempo (en dias):</label>
                {isEditMode ? 
                    (<input type="number" id="time" name="time" maxLength="20" value={time} onChange={(event) => setTime(event.target.value)} required/>) : 
                    (<input type="number" id="time" name="time" maxLength="20" onChange={(event) => setTime(event.target.value)} required/>)
                }
                <div className="assigned-developers">
                    <label htmlFor="developers">Desarrollador/es asignado/s:</label>
                    
                        {developers.map((dev) => (
                            <div className="checkbox-dev"key={dev.id}>
                                <input
                                    type="checkbox"
                                    value={dev.id}
                                    onChange={(event) => {
                                        const isChecked = event.target.checked;
                                        setAssignedDevelopers((prev) =>
                                        isChecked ? [...prev, dev.username] : prev.filter((username) => username !== dev.username)
                                        );
                                        setIdDevelopers((prev) =>
                                        isChecked ? [...prev, dev.id] : prev.filter((id) => id !== dev.id)
                                        );
                                    }}
                                    checked={idDevelopers.includes(dev.id)}
                                    />
                                {dev.username}
                            </div>
                        ))}
                </div>

                {isEditMode ? 
                    (<button className='warning' onClick={(e) => {
                        e.preventDefault();
                        handleFormCreateTask();
                    }}>Editar Tarea</button>) : 
                    (<button className='btn-primary clean' onClick={(e) => {
                        e.preventDefault();
                        handleFormCreateTask();
                    }}>Crear Tarea</button>)
                }
            </form>
        </div>
    ); // esta es linea 185... ???????
}

export default CreateTask;
