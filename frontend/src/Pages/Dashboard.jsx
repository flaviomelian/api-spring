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
        <div className='dashboard'>
            {console.log(users)}
            <h1>Equipo</h1>
            <table>
                <thead>
                    <tr>
                        <th className='spaced'>ID</th>
                        <th className='spaced'>Usuario</th>
                        <th className='spaced'>Nombre</th>
                        <th className='spaced'>Apellidos</th>
                        <th className='spaced'>Rol</th>
                        <th className='spaced'>Salario</th>
                        <th className='operations'>Operaciones</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr>
                        <td className='spaced' key={index}>{user.id}</td>
                        <td className='spaced' key={index}>{user.username}</td>
                        <td className='spaced' key={index}>{user.name}</td>
                        <td className='spaced' key={index}>{user.surnames}</td>
                        <td className='spaced' key={index}>{user.role}</td>
                        <td className='spaced' key={index}>{user.salary} €</td>
                        <td className='spaced'>
                            <button className="btn warning">Editar</button>
                        </td>
                        <td className='spaced'>
                            <button className="btn danger">Eliminar</button>
                        </td>
                    </tr>
                ))}    
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={12} className="text-center">
                            <button className='btn primary clean'>Crear desarrollador</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Dashboard
