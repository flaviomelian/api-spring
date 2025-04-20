import React, { useEffect, useState } from 'react'
import { getAllProjects, deleteProject } from '../../services/services'
import './Project.css'
import notfound from './../../assets/notfound.jpg'
import { useNavigate } from 'react-router-dom'

const Project = () => {

    const [projects, setProjects] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        handleGetProjectInformation()
    }, [])

    useEffect(() => {
        if (location.state?.fromCreateDevOk) {
            setShowAlert(true)
            const timer = setTimeout(() => {
                setShowAlert(false)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleGetProjectInformation = async () => {
        const result = await getAllProjects()
        console.log(result)
        setProjects(result)
    }

    const handleDeleteProject = async (id) => {
        await deleteProject(id)
        setProjects(projects.filter(project => project.id !== id));
    }

    const unformatDateFromMySQL = (date) => {
        const [year, month, day] = date.split('-'); // Dividimos la fecha en día, mes y año
        return `${day}-${month}-${year}`; // Devolvemos en formato aaaa-mm-dd
    };

    return (
        <div className='project-dashboard'>
            {showAlert && (
                <div className="alert alert-success" role="alert">
                    Proyecto creado correctamente!
                </div>
            )}
            <h1>Proyectos</h1> 
                <button className='btn primary clean-project' onClick={() => navigate("../create-project")}>Crear proyecto</button>
                {projects.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <td><b>ID</b></td>
                            <td><b>Proyecto</b></td>
                            <td><b>Fecha de inicio</b></td>
                            <td><b>Empresa</b></td>
                            <td><b>Deadline</b></td>
                            <td className='operations-project'><b>Operaciones</b></td>
                        </tr>
                    </thead>
                    <tbody>
                    {projects.map((project, index) => (
                        <tr key={index}>
                            <td>{project.id}</td>
                            <td>{project.name}</td>
                            <td>{unformatDateFromMySQL(project.initdate)}</td>
                            <td>{project.enterprise}</td>
                            <td>{unformatDateFromMySQL(project.deadline)}</td>
                            <div className='tools'>
                                <td>
                                    <button className="btn warning" onClick={() => navigate("../create-project", { state: { project } })}>Editar</button>
                                </td>
                                <td>
                                    <button className="btn danger" onClick={() => handleDeleteProject(project.id)}>Eliminar</button>
                                </td>
                                <td>
                                    <button className="btn success" onClick={() => navigate("../create-task", { state: { project: project } })}>Crear Tarea</button>
                                </td>
                                <td>
                                    <button className="btn" onClick={() => navigate("../kanban", { state: { project: project } })}>Ver Tareas</button>
                                </td>
                            </div>
                        </tr>
                    ))}    
                    </tbody>
                </table> ) : (
                    <>
                        <h2>Sin proyectos dados de alta</h2>
                        <img className='not-found' src={notfound}/>
                    </>
                )}
                {projects.length > 0 ? (
                    <ul className="project-list">
                        {projects.map((project, index) => (
                        <li key={index} className="project-item">
                            <span><b>ID:</b> <p>{project.id}</p></span>
                            <span><b>Nombre:</b> <p>{project.name}</p></span>
                            <span><b>Fecha de inicio:</b> <p>{project.initdate}</p></span>
                            <span><b>Empresa:</b> <p>{project.enterprise}</p></span>
                            <span><b>Deadline:</b> <p>{project.deadline}</p></span>
                            <span className='tools'>
                                <button
                                    className="btn warning"
                                    onClick={() => navigate("../create-project", { state: { project } })}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn danger"
                                    onClick={() => handleDeleteProject(project.id)}
                                >
                                    Eliminar
                                </button>
                                <button className="btn success" onClick={() => navigate("../create-task", { state: { project: project } })}>Crear Tarea</button>
                                <button className="btn" onClick={() => navigate("../kanban", { state: { project: project } })}>Ver Tareas</button>
                            </span>
                        </li>
                        ))}
                    </ul> 
                ) : (
                <>
                    <h2>Sin proyectos dados de alta</h2>
                    <img className='not-found' src={notfound}/>
                </>
                )}
            
        </div>
    )
}

export default Project
