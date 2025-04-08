import React, { useState, useEffect } from 'react'
import './CreateTaskComponent.css'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useLocation } from "react-router-dom";
import { useTaskContext } from '../../Context/Context';
import taskimg from '../../assets/task.png'
import { getAllTasksByProject, getAllUsers } from '../../services/services'

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
    const [isEditMode, setIsEditMode] = useState(false);  

      

    useEffect(() => {
        handleGetTaskInformation()
    }, [project])

    useEffect(() => {
      handleGetDevelopersInformation()
    }, [developers])
    
    const handleGetDevelopersInformation = async () => {
        const result = await getAllUsers()
        console.log(result)
        setDevelopers(result)
    }

    const handleGetTaskInformation = async () => {
        const result = await getAllTasksByProject(project.id)
        console.log(result)
        setDevelopers(result)
    }

    useEffect(() => {
        if(task && !isEditMode){
            setIsEditMode(true);  
            setContent(task.content);
            setPriority(task.priority);
            setTime(task.time);
        }  
    }, [task, isEditMode]);

    const handleFormCreateTask = () =>{
        
        if (
            content.length === 0 ||
            priority.length === 0 ||
            time.length === 0
        ) {
            return toast.error('Introduzca todos los campos del formulario correctamente')
        }
    
        try {
            const data = {
                id: task ? task.id : null, // Usamos el ID de la tarea si estamos editando
                content,
                priority,
                time,
                project,
            };
            console.log(data)
            setTaskData(data);
            isEditMode ? navigate('/create-task-ok', { state: true }) : navigate('/create-task-ok', { state: false });
        } catch (error) {
            toast.error('Error al crear o editar la tarea');
        }
      }

  return (
    
    <div className='team-dashboard'>
        <Toaster />
        <div className='task-img-header'>
            <img className='task' src={taskimg}/>
            <h1 id='title'>{isEditMode ? 'Edición de tarea' : 'Alta de tarea'}</h1>
        </div>
        <form id="taskForm">
            <div className="input-group">
                <label htmlFor="Taskname">Tarea:</label>
                {isEditMode ?
                    (<input type="text" id="Taskname" name="Taskname" maxLength="25" value={content} onChange={(event) => setContent(event.target.value)} required/>) : 
                    (<input type="text" id="Taskname" name="Taskname" maxLength="25" onChange={(event) => setContent(event.target.value)} required/>)
                }
            </div>
            <div className="input-group">
                <label htmlFor="initdate">Prioridad:</label>
                {isEditMode ?
                    (<select id="role" name="priority" value={priority} onChange={(event) => setPriority(event.target.value)} required>
                        <option value="SELECT">Seleccionar</option>
                        <option value="ALTA">Alta</option>
                        <option value="MEDIANA">Mediana</option>
                        <option value="BAJA">Baja</option>
                    </select>) :
                    (<select id="role" name="priority" onChange={(event) => setPriority(event.target.value)} required>
                        <option value="SELECT">Seleccionar</option>
                        <option value="ALTA">Alta</option>
                        <option value="MEDIANA">Mediana</option>
                        <option value="BAJA">Baja</option>
                    </select>) 
                }
            </div>
            <div className="input-group">
                <label htmlFor="enterprise">Tiempo (en dias):</label>
                {isEditMode ?
                    (<input type="number" id="enterprise" name="enterprise" maxLength="20" value={time} onChange={(event) => setTime(event.target.value)} required/>) :
                    (<input type="number" id="enterprise" name="enterprise" maxLength="20" onChange={(event) => setTime(event.target.value)} required/>)
                }
            </div>
            <div className="input-group">
                <label htmlFor="developers">Desarrollador/es asignado/s:</label>
                <select
                    id="developers"
                    name="developers"
                    multiple
                    value={developers} // <-- Array de IDs
                    onChange={(e) => {
                        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                        setDevelopers(selectedOptions);
                    }}
                    required
                >
                    {developers.map((dev) => (
                        <option key={dev.id} value={dev.id}>
                            {dev.name}
                        </option>
                    ))}
                </select>
            </div>

            {isEditMode ?
                (<button className='warning'onClick={(e) => {
                    e.preventDefault()
                    handleFormCreateTask()}}>Editar Tarea</button>):(
                <button className='btn-primary clean'onClick={(e) => {
                    e.preventDefault()
                    handleFormCreateTask()}}>Crear Tarea</button>)
            }
        </form>
    </div>
  )
}

export default CreateTask
