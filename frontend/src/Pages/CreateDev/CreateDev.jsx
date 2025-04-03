import React, { useState } from 'react'
import './CreateDev.css'
import toast, { Toaster } from 'react-hot-toast'
import { createUser } from "../../services/services";
import { useNavigate } from "react-router-dom";
import { useUserContext } from '../../Context/Context';
import dev from '../../assets/dev.png'

const CreateDev = () => {

    const navigate = useNavigate();
    const { setUserData } = useUserContext();
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [surnames, setSurnames] = useState('');
    const [salary, setSalary] = useState(0);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const handleFormCreateUser = () =>{
        if (
            username.length === 0 ||
            name.length === 0 ||
            surnames.length === 0 ||
            salary === 0 ||
            email.length === 0 ||
            role.length === 0 ||
            role === 'SELECT'
        ) {
            return toast.error('Introduzca todos los campos del formulario correctamente')
        }
    
        try {
          const data = {
            username: username,
            name: name,
            surnames: surnames,
            salary: salary,
            email: email,
            role: role,
          }
          setUserData(data);
        
          navigate('/create-dev-ok')
        } catch (error) {
            toast.error('Introduzca todos los campos del formulario correctamente')
        }
      }

  return (
    <div className='team-dashboard'>
        <Toaster />
        <div className='dev-img-header'>
            <img className='dev' src={dev}/>
            <h1 id='title'>Alta de desarrollador</h1>
        </div>
        <form id="userForm" onSubmit={(event) => {
            event.preventDefault();
            handleFormCreateUser();
        }}>
            <div className="input-group">
                <label htmlFor="username">Usuario:</label>
                <input type="text" id="username" name="username" onChange={(event) => setUsername(event.target.value)} required/>
            </div>
            <div className="input-group">
                <label htmlFor="name">Nombre:</label>
                <input type="text" id="name" name="name" onChange={(event) => setName(event.target.value)} required/>
            </div>
            <div className="input-group">
                <label htmlFor="surnames">Apellidos:</label>
                <input type="text" id="surnames" name="surnames" onChange={(event) => setSurnames(event.target.value)} required/>
            </div>
            <div className="input-group">
                <label htmlFor="salary">Salario (€):</label>
                <input type="number" id="salary" name="salary" step="10" min="1000" onChange={(event) => setSalary(event.target.value)} required/>
            </div>
            <div className="input-group">
                <label htmlFor="email">Correo electrónico:</label>
                <input type="email" id="email" name="email" onChange={(event) => setEmail(event.target.value)} required/>
            </div>
            <div className="input-group">
                <label htmlFor="role">Rol:</label>
                <select id="role" name="role" onChange={(event) => setRole(event.target.value)} required>
                    <option value="SELECT">Seleccionar</option>
                    <option value="FRONTEND">Frontend</option>
                    <option value="BACKEND">Backend</option>
                    <option value="FULLSTACK">Fullstack</option>
                    <option value="IT_SUPPORT">IT Support</option>
                </select>
            </div>
            <button type="submit" className='btn-primary clean'onClick={(e) => {
            e.preventDefault()
            handleFormCreateUser()}}>Crear Desarrollador</button>
        </form>
    </div>
  )
}

export default CreateDev
