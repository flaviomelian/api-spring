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
        // Si venimos de la página de creación, mostrar el alert
        if (location.state?.fromCreateDevOk) {
            setShowAlert(true)

            // Desaparecer el alert después de 3 segundos
            const timer = setTimeout(() => {
                setShowAlert(false)
            }, 3000)

            // Limpiar el temporizador si el componente se desmonta
            return () => clearTimeout(timer)
        }
    }, [])

    const handleGetUserInformation = async () => {
        const result = await getAllUsers()
        console.log(result)
        setUsers(result)
    }

    const handleDeleteUser = async () => {
        await deleteUser()
    }

    return (
        <div className='team-dashboard'>
            {showAlert && (
                <div className="alert alert-success" role="alert">
                    Usuario creado correctamente!
                </div>
            )}
            <h1>Equipo</h1>
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
                        <div>
                            <td>
                                <button className="btn warning">Editar</button>
                            </td>
                            <td>
                                <button className="btn danger" onClick={handleDeleteUser}>Eliminar</button>
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
            <button className='btn primary clean' onClick={() => navigate("../create-dev")}>Crear desarrollador</button>
        </div>
    )
}

export default Team
