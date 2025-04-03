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
                {users.map((user, index) => (
                    <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.name}</td>
                        <td>{user.surnames}</td>
                        <td>{user.role}</td>
                        <td>{user.email}</td>
                        <td>{user.salary} €</td>
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
        </div>
    )
}

export default Team
