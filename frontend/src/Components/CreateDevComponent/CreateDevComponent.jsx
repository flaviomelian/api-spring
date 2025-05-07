/**
 * Componente `CreateDev` para la creación y edición de desarrolladores.
 * 
 * Este componente permite a los usuarios crear nuevos desarrolladores o editar la información de desarrolladores existentes.
 * Los campos del formulario incluyen el nombre de usuario, nombre, apellidos, salario, correo electrónico y rol.
 * La lógica de la aplicación permite cambiar entre el modo de creación y el modo de edición, dependiendo de si los datos del usuario son proporcionados a través de la ubicación.
 * 
 * @component
 * @example
 * // Ejemplo de uso para crear un nuevo desarrollador
 * <CreateDev />
 * 
 * @returns {React.Element} El componente `CreateDev` que renderiza un formulario para crear o editar desarrolladores.
 */
import React, { useState, useEffect } from 'react';
import './CreateDevComponent.css';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from '../../Context/Context';
import dev from '../../assets/dev.png';

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

    /**
     * Efecto para inicializar los valores del formulario si el componente está en modo de edición.
     */
    useEffect(() => {
        if (user && !isEditMode) {
            setIsEditMode(true);
            setUsername(user.username);
            setName(user.name);
            setSurnames(user.surnames);
            setSalary(user.salary);
            setEmail(user.email);
            setRole(user.role);
        }
    }, [user, isEditMode]);

    /**
     * Función para manejar la creación o edición del desarrollador.
     * Valida los campos del formulario y luego envía los datos para crear o editar el desarrollador.
     */
    const handleFormCreateUser = () => {
        if (
            username.length === 0 ||
            name.length === 0 ||
            surnames.length === 0 ||
            salary === 0 ||
            email.length === 0 ||
            role.length === 0 ||
            role === ')SELECT'
        ) {
            return toast.error('Introduzca todos los campos del formulario correctamente');
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
            };
            setUserData(data);

            // Redirige dependiendo de si estamos en modo edición o no
            if (isEditMode) navigate('/create-dev-ok', { state: true });
            else navigate('/create-dev-ok');
        } catch (error) {
            toast.error('Introduzca todos los campos del formulario correctamente');
        }
    }

    // Renderiza el formulario de creación o edición del desarrollador
    return (
        <div className='team-dashboard'>
            <Toaster />
            <form id="userForm">
                <div className='dev-img-header'>
                    <img className='dev' src={dev} alt="Developer" />
                    <h1 id='title'>{isEditMode ? 'Edición de desarrollador' : 'Alta de desarrollador'}</h1>
                </div>
                {isEditMode ? 
                    (<input type="text" id="username" name="username" placeholder='nombre de usuario' maxLength="15" value={username} onChange={(event) => setUsername(event.target.value)} required />) :
                    (<input type="text" id="username" name="username" placeholder='nombre de usuario' maxLength="15" onChange={(event) => setUsername(event.target.value)} required />)
                }
                {isEditMode ? 
                    (<input type="text" id="name" name="name" placeholder='nombre' maxLength="15" value={name} onChange={(event) => setName(event.target.value)} required />) :
                    (<input type="text" id="name" name="name" placeholder='nombre' maxLength="15" onChange={(event) => setName(event.target.value)} required />)
                }
                {isEditMode ? 
                    (<input type="text" id="surnames" name="surnames" placeholder='apellidos' maxLength="20" value={surnames} onChange={(event) => setSurnames(event.target.value)} required />) :
                    (<input type="text" id="surnames" name="surnames" placeholder='apellidos' maxLength="20" onChange={(event) => setSurnames(event.target.value)} required />)
                }
                {isEditMode ? 
                    (<input type="number" id="salary" name="salary" placeholder='salario' value={salary} step="10" min="1000" onChange={(event) => setSalary(event.target.value)} required />) :
                    (<input type="number" id="salary" name="salary" placeholder='salario' step="10" min="1000" onChange={(event) => setSalary(event.target.value)} required />)
                }
                {isEditMode ? 
                    (<input type="email" id="email" name="email" placeholder='correo electrónico' maxLength="30" value={email} onChange={(event) => setEmail(event.target.value)} required />) :
                    (<input type="email" id="email" name="email" placeholder='correo electrónico' maxLength="30" onChange={(event) => setEmail(event.target.value)} required />)
                }
                {isEditMode ? 
                    (<select id="role" name="role" value={role} onChange={(event) => setRole(event.target.value)} required>
                        <option value=")SELECT">Rol</option>
                        <option value="FRONTEND">Frontend</option>
                        <option value="BACKEND">Backend</option>
                        <option value="FULLSTACK">Fullstack</option>
                        <option value="IT_SUPPORT">IT Support</option>
                    </select>) :
                    (<select id="role" name="role" onChange={(event) => setRole(event.target.value)} required>
                        <option value=")SELECT">Rol</option>
                        <option value="FRONTEND">Frontend</option>
                        <option value="BACKEND">Backend</option>
                        <option value="FULLSTACK">Fullstack</option>
                        <option value="IT_SUPPORT">IT Support</option>
                    </select>)
                }
                {isEditMode ? 
                    (<button className='warning' onClick={(e) => {
                        e.preventDefault();
                        handleFormCreateUser();
                    }}>Editar Desarrollador</button>) : 
                    (<button className='btn-primary clean' onClick={(e) => {
                        e.preventDefault();
                        handleFormCreateUser();
                    }}>Crear Desarrollador</button>)
                }
            </form>
        </div>
    );
}

export default CreateDev;
