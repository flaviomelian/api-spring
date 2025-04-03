import React, { useState, useEffect } from 'react'
import './CreateDevComponent.css'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from '../../Context/Context';
import dev from '../../assets/dev.png'

const CreateDev = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { setUserData } = useUserContext();
    const user = location.state?.user;
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [surnames, setSurnames] = useState('');
    const [salary, setSalary] = useState(0);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);  

    useEffect(() => {
        if(user && !isEditMode){
            setIsEditMode(true);  
            setUsername(user.username);
            setName(user.name);
            setSurnames(user.surnames);
            setSalary(user.salary);
            setEmail(user.email);
            setRole(user.role);
        }  
    }, [user, isEditMode]);

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
            id: location.state?.user.id,
            username: username,
            name: name,
            surnames: surnames,
            salary: salary,
            email: email,
            role: role,
          }
          setUserData(data);

          if (isEditMode) navigate('/create-dev-ok', { state: true })
          else navigate('/create-dev-ok')
        } catch (error) {
            toast.error('Introduzca todos los campos del formulario correctamente')
        }
      }

  return (
    
    <div className='team-dashboard'>
        <Toaster />
        <div className='dev-img-header'>
            <img className='dev' src={dev}/>
            <h1 id='title'>{isEditMode ? 'Edición de desarrollador' : 'Alta de desarrollador'}</h1>
        </div>
        <form id="userForm">
            <div className="input-group">
                <label htmlFor="username">Usuario:</label>
                {isEditMode ?
                    (<input type="text" id="username" name="username" maxLength="15" value={username} onChange={(event) => setUsername(event.target.value)} required/>) : 
                    (<input type="text" id="username" name="username" maxLength="15" onChange={(event) => setUsername(event.target.value)} required/>)
                }
            </div>
            <div className="input-group">
                <label htmlFor="name">Nombre:</label>
                {isEditMode ?
                    (<input type="text" id="name" name="name" maxLength="15" value={name} onChange={(event) => setName(event.target.value)} required/>) :
                    (<input type="text" id="name" name="name" maxLength="15" onChange={(event) => setName(event.target.value)} required/>)
                }
            </div>
            <div className="input-group">
                <label htmlFor="surnames">Apellidos:</label>
                {isEditMode ?
                    (<input type="text" id="surnames" name="surnames" maxLength="20" value={surnames} onChange={(event) => setSurnames(event.target.value)} required/>) :
                    (<input type="text" id="surnames" name="surnames" maxLength="20" onChange={(event) => setSurnames(event.target.value)} required/>)
                }
            </div>
            <div className="input-group">
                <label htmlFor="salary">Salario (€):</label>
                {isEditMode ?
                    (<input type="number" id="salary" name="salary" value={salary} step="10" min="1000" onChange={(event) => setSalary(event.target.value)} required/>) :
                    (<input type="number" id="salary" name="salary" step="10" min="1000" onChange={(event) => setSalary(event.target.value)} required/>)
                }
            </div>
            <div className="input-group">
                <label htmlFor="email">Correo electrónico:</label>
                {isEditMode ?
                    (<input type="email" id="email" name="email" maxLength="30" value={email} onChange={(event) => setEmail(event.target.value)} required/>) :
                    (<input type="email" id="email" name="email" maxLength="30" onChange={(event) => setEmail(event.target.value)} required/>)
                }
            </div>
            <div className="input-group">
                <label htmlFor="role">Rol:</label>
                {isEditMode ?
                    (<select id="role" name="role" value={role} onChange={(event) => setRole(event.target.value)} required>
                        <option value=")SELECT">Seleccionar</option>
                        <option value="FRONTEND">Frontend</option>
                        <option value="BACKEND">Backend</option>
                        <option value="FULLSTACK">Fullstack</option>
                        <option value="IT_SUPPORT">IT Support</option>
                    </select>) :
                    (<select id="role" name="role" onChange={(event) => setRole(event.target.value)} required>
                        <option value=")SELECT">Seleccionar</option>
                        <option value="FRONTEND">Frontend</option>
                        <option value="BACKEND">Backend</option>
                        <option value="FULLSTACK">Fullstack</option>
                        <option value="IT_SUPPORT">IT Support</option>
                    </select>) 
                }
            </div>
            {isEditMode ?
                (<button className='warning'onClick={(e) => {
                    e.preventDefault()
                    handleFormCreateUser()}}>Editar Desarrollador</button>):(
                <button className='btn-primary clean'onClick={(e) => {
                    e.preventDefault()
                    handleFormCreateUser()}}>Crear Desarrollador</button>)
            }
        </form>
    </div>
  )
}

export default CreateDev
