import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../services/services'
import './Dashboard.css'

const Dashboard = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        handleGetUserInformation()
    }, [])

    const handleGetUserInformation = async () => {
        const result = await getAllUsers()
        setUsers(result)
    }

    return (
        <div>
            {console.log(users)}
            <h1>Equipo</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Rol</th>
                        <th>Salario</th>
                        <th>Operaciones</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr>
                        <td key={index}>{user.id}</td>
                        <td key={index}>{user.username}</td>
                        <td key={index}>{user.name}</td>
                        <td key={index}>{user.surnames}</td>
                        <td key={index}>{user.role}</td>
                        <td key={index}>{user.salary} €</td>
                        <td>
                            <button className="btn warning">Editar</button>
                            <button className="btn danger">Eliminar</button>
                        </td>
                    </tr>
                ))}    
                </tbody>
            
            </table>
        </div>
    )
}

export default Dashboard
