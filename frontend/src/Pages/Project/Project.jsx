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

    return (
        <div className='project-dashboard'>
            {showAlert && (
                <div className="alert alert-success" role="alert">
                    Usuario creado correctamente!
                </div>
            )}
            <h1>Proyectos</h1> 
                <button className='btn primary clean' onClick={() => navigate("../create-project")}>Crear proyecto</button>
                {projects.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <td><b>ID</b></td>
                            <td><b>Usuario</b></td>
                            <td><b>Nombre</b></td>
                            <td><b>Apellidos</b></td>
                            <td><b>Rol</b></td>
                            <td><b>Email</b></td>
                            <td><b>Salario</b></td>
                            <td className='operations'><b>Operaciones</b></td>
                        </tr>
                    </thead>
                    <tbody>
                    {projects.map((project, index) => (
                        <tr key={index}>
                            <td>{project.id}</td>
                            <td>{project.projectname}</td>
                            <td>{project.name}</td>
                            <td>{project.surnames}</td>
                            <td>{project.role}</td>
                            <td>{project.email}</td>
                            <td>{project.salary} €</td>
                            <div className='tools'>
                                <td>
                                    <button className="btn warning" onClick={() => navigate("../create-project", { state: { project } })}>Editar</button>
                                </td>
                                <td>
                                    <button className="btn danger" onClick={() => handleDeleteProject(project.id)}>Eliminar</button>
                                </td>
                                <td>
                                    <button className="btn success">Asignar Tarea</button>
                                </td>
                            </div>
                        </tr>
                    ))}    
                    </tbody>
                </table> ): (
                <>
                    <h2>Sin proyectos dados de alta</h2>
                    <img className='not-found' src={notfound}/>
                </>
                )}
            
        </div>
    )
}

export default Project
