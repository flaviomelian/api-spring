/**
 * Componente `CreateProject` para la creación y edición de proyectos.
 * 
 * Este componente permite al usuario crear nuevos proyectos o editar proyectos existentes. Los campos del formulario incluyen 
 * el nombre del proyecto, la fecha límite (deadline), la empresa asociada al proyecto y la fecha de inicio. Además, el formulario 
 * tiene validación para asegurar que todos los campos sean completados correctamente antes de enviar la información.
 * 
 * La lógica de la aplicación incluye la verificación de si el componente se está utilizando en modo edición (cuando se recibe un 
 * proyecto desde la ubicación). Si se recibe un proyecto, el componente se prepara para editarlo con los datos existentes.
 * 
 * @component
 * @example
 * Ejemplo de uso para crear un proyecto
 * <CreateProject />
 * 
 * @returns {React.Element} El componente `CreateProject` que renderiza un formulario para crear o editar proyectos.
 */
import React, { useState, useEffect } from 'react';
import './CreateProjectComponent.css';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from "react-router-dom";
import { useProjectContext } from '../../Context/Context';
import projectimg from '../../assets/project.png';

const CreateProject = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { setProjectData }  = useProjectContext();
    const project = location.state?.project;
    const [name, setName] = useState('');
    const [deadline, setDeadline] = useState('');
    const [enterprise, setEnterprise] = useState('');
    const [initDate, setInitDate] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);  

    /**
     * Función para formatear las fechas en el formato dd-mm-yyyy.
     * 
     * @param {string} date - Fecha a formatear.
     * @returns {string} La fecha en formato "dd-mm-yyyy".
     */
    const formatDate = (date) => {
        const dateObj = new Date(date);
        const day = ("0" + dateObj.getDate()).slice(-2); // Asegura que siempre tenga 2 dígitos
        const month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // El mes es 0-indexado
        const year = dateObj.getFullYear();
        return `${day}-${month}-${year}`;
    };

    /**
     * Efecto para inicializar los valores del formulario si el componente está en modo de edición.
     */
    useEffect(() => {
        if(project && !isEditMode){
            setIsEditMode(true);  
            setName(project.name);
            setDeadline(formatDate(project.deadline));
            setEnterprise(project.enterprise);
            setInitDate(formatDate(project.initDate));
        }  
    }, [project, isEditMode]);

    /**
     * Función para manejar la creación o edición del proyecto.
     * Verifica que todos los campos sean completados antes de enviar la información.
     * Si está en modo edición, actualiza el proyecto existente, de lo contrario crea un nuevo proyecto.
     */
    const handleFormCreateProject = () => {
        
        if (
            name.length === 0 ||
            deadline.length === 0 ||
            initDate.length === 0 ||
            enterprise.length === 0
        ) {
            return toast.error('Introduzca todos los campos del formulario correctamente');
        }
    
        try {
          const data = {
            id: location.state?.project.id,
            name: name,
            deadline: deadline,
            enterprise: enterprise,
            initDate: initDate,
          };
          setProjectData(data);

          // Redirige dependiendo de si estamos en modo edición o no
          if (isEditMode) navigate('/create-project-ok', { state: true });
          else navigate('/create-project-ok');
        } catch (error) {
            toast.error('Introduzca todos los campos del formulario correctamente');
        }
    }

    // Renderiza el formulario de creación o edición de proyecto
    return (
        <div className='team-dashboard'>
            <Toaster />
            <form id="projectForm">
                <div className='project-img-header'>
                    <img className='project' src={projectimg} alt="Project" />
                    <h1 id='title'>{isEditMode ? 'Edición de proyecto' : 'Alta de proyecto'}</h1>
                </div>
                {isEditMode ? 
                    (<input type="text" id="Projectname" name="Projectname" placeholder='Proyecto' maxLength="25" value={name} onChange={(event) => setName(event.target.value)} required/>) : 
                    (<input type="text" id="Projectname" name="Projectname" placeholder='Proyecto' maxLength="25" onChange={(event) => setName(event.target.value)} required/>)
                }
                {isEditMode ? 
                    (<input type="text" id="enterprise" name="enterprise" placeholder='Empresa' maxLength="20" value={enterprise} onChange={(event) => setEnterprise(event.target.value)} required/>) :
                    (<input type="text" id="enterprise" name="enterprise" placeholder='Empresa' maxLength="20" onChange={(event) => setEnterprise(event.target.value)} required/>)
                }
                <div className="input-group">
                    <label htmlFor="initdate">Fecha de inicio:</label>
                    {isEditMode ? 
                        (<input type="date" id="initdate" name="initdate" value={initDate} onChange={(event) => setInitDate(formatDate(event.target.value))} required/>) : 
                        (<input type="date" id="initdate" name="initdate" onChange={(event) => setInitDate(formatDate(event.target.value))} required/>)
                    }
                </div>
                
                <div className="input-group">
                    <label htmlFor="deadline">Deadline:</label>
                    {isEditMode ? 
                        (<input type="date" id="deadline" name="deadline" maxLength="15" value={deadline} onChange={(event) => setDeadline(formatDate(event.target.value))} required/>) : 
                        (<input type="date" id="deadline" name="deadline" maxLength="15" onChange={(event) => setDeadline(formatDate(event.target.value))} required/>)
                    }
                </div>
                {isEditMode ? 
                    (<button className='warning' onClick={(e) => {
                        e.preventDefault();
                        handleFormCreateProject();
                    }}>Editar Proyecto</button>) : 
                    (<button className='btn-primary clean' onClick={(e) => {
                        e.preventDefault();
                        handleFormCreateProject();
                    }}>Crear Proyecto</button>)
                }
            </form>
        </div>
    );
}

export default CreateProject;
