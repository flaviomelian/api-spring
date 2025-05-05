import React, { useEffect, useState } from 'react'
import { getAllUsers, deleteUser } from '../../services/services'
import './Team.css'
import notfound from './../../assets/notfound.jpg'
import { useNavigate } from 'react-router-dom'

const Team = () => {

    const [users, setUsers] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        handleGetUserInformation()
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

    const handleGetUserInformation = async () => {
        const result = await getAllUsers()
        console.log(result)
        setUsers(result)
    }

    const handleDeleteUser = async (id) => {
        await deleteUser(id)
        setUsers(users.filter(user => user.id !== id));
    }

    return (
        <div className='team-dashboard'>
            {showAlert && (
                <div className="alert alert-success" role="alert">
                    Usuario creado correctamente!
                </div>
            )}
            <h1>Equipo</h1> 
                <button className='btn primary clean' onClick={() => navigate("../create-dev")}>Crear desarrollador</button>
                {users.length > 0 ? (
                <table className='developers-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Rol</th>
                            <th>Email</th>
                            <th>Salario</th>
                            <th>Operaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.name}</td>
                            <td>{user.surnames}</td>
                            <td>{user.role ? user.role : "Por asignar"}</td>
                            <td>{user.email}</td>
                            <td>{user.salary ? user.salary + " €" : "Por asignar"}</td>
                            <div className='tools'>
                                <td>
                                    <button className="btn warning" onClick={() => navigate("../create-dev", { state: { user } })}>Editar</button>
                                </td>
                                <td>
                                    <button className="btn danger" onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
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
                    <h2>Sin desarrolladores dados de alta</h2>
                    <img className='not-found' src={notfound}/>
                </>
                )}
                {users.length > 0 ? (
                <ul className="user-list">
                    {users.map((user, index) => (
                    <li key={index} className="user-item">
                        <span><b>ID:</b> <p>{user.id}</p></span>
                        <span><b>Usuario:</b> <p>{user.username}</p></span>
                        <span><b>Nombre:</b> <p>{user.name}</p></span>
                        <span><b>Apellidos:</b> <p>{user.surnames}</p></span>
                        <span><b>Rol:</b> <p>{user.role}</p></span>
                        <span><b>Email:</b> <p>{user.email}</p></span>
                        <span><b>Salario:</b> <p>{user.salary} €</p></span>
                        <span className='tools'>
                            <button
                                className="btn warning"
                                onClick={() => navigate("../create-dev", { state: { user } })}
                            >
                                Editar
                            </button>
                            <button
                                className="btn danger"
                                onClick={() => handleDeleteUser(user.id)}
                            >
                                Eliminar
                            </button>
                            <button className="btn success">Asignar Tarea</button>
                        </span>
                    </li>
                    ))}
                </ul>
                ) : (
                <>
                    <h2>Sin desarrolladores dados de alta</h2>
                    <img className='not-found' src={notfound} />
                </>
                )}

        </div>
    )
}

export default Team
