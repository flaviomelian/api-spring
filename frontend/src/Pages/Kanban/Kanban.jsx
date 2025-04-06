import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import './Kanban.css'
import { getAllTasksByProject } from '../../services/services'

const Kanban = () => {

    const location = useLocation();
    const project = location.state?.project;
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                console.log(project);
                
                const result = await getAllTasksByProject(project.id)
                setTasks(result)
            } catch (error) {
                console.error(error)
            }
        }
        fetchTasks()
    }, [project])

  return (
    <div className='kanban'>
        <div className='header-kanban'>
            <div className='to-do kanban-section'>
                <h1 className='kanban-section-header'>Por hacer</h1>
                {tasks.map((task) => (
                    <div key={task.id} className='task-card'>
                        <h2>{task.content}</h2>
                        <p>Prioridad: {task.priority}</p>
                        <p>Días estimados: {task.time}</p>
                        <p>Asignado a: {task.assignedTo}</p>
                    </div>
                ))}
            </div>
            <div className='progress kanban-section'>
                <h1 className='kanban-section-header'>En progreso</h1>
            </div>
            <div className='review kanban-section'>
                <h1 className='kanban-section-header'>En revisión</h1>
            </div>
            <div className='done kanban-section'>
                <h1 className='kanban-section-header'>Hecho</h1>
            </div>
        </div>
    </div>
  )
}

export default Kanban
