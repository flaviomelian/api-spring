import React, { useState, useEffect } from 'react'
import './CreateProjectComponent.css'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useLocation } from "react-router-dom";
import { useProjectContext } from '../../Context/Context';
import projectimg from '../../assets/project.png'

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

    const formatDate = (date) => {
        const dateObj = new Date(date);
        const day = ("0" + dateObj.getDate()).slice(-2); // Asegura que siempre tenga 2 dígitos
        const month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // El mes es 0-indexado
        const year = dateObj.getFullYear();
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        if(project && !isEditMode){
            setIsEditMode(true);  
            setName(project.name);
            setDeadline(formatDate(project.deadline));
            setEnterprise(project.enterprise);
            setInitDate(formatDate(project.initDate));
        }  
    }, [project, isEditMode]);

    const handleFormCreateProject = () =>{
        
        if (
            name.length === 0 ||
            deadline.length === 0 ||
            initDate.length === 0 ||
            enterprise.length === 0
        ) {
            return toast.error('Introduzca todos los campos del formulario correctamente')
        }
    
        try {
          const data = {
            id: location.state?.project.id,
            name: name,
            deadline: deadline,
            enterprise: enterprise,
            initDate: initDate,
          }
          setProjectData(data);

          if (isEditMode) navigate('/create-project-ok', { state: true })
          else navigate('/create-project-ok')
        } catch (error) {
            toast.error('Introduzca todos los campos del formulario correctamente')
        }
      }

  return (
    
    <div className='team-dashboard'>
        <Toaster />
        <div className='project-img-header'>
            <img className='project' src={projectimg}/>
            <h1 id='title'>{isEditMode ? 'Edición de proyecto' : 'Alta de proyecto'}</h1>
        </div>
        <form id="projectForm">
            <div className="input-group">
                <label htmlFor="Projectname">Proyecto:</label>
                {isEditMode ?
                    (<input type="text" id="Projectname" name="Projectname" maxLength="25" value={name} onChange={(event) => setName(event.target.value)} required/>) : 
                    (<input type="text" id="Projectname" name="Projectname" maxLength="25" onChange={(event) => setName(event.target.value)} required/>)
                }
            </div>
            <div className="input-group">
                <label htmlFor="initdate">Fecha de inicio:</label>
                {isEditMode ?
                    (<input type="date" id="initdate" name="initdate" value={initDate} onChange={(event) => setInitDate(formatDate(event.target.value))} required/>) :
                    (<input type="date" id="initdate" name="initdate" onChange={(event) => setInitDate(formatDate(event.target.value))} required/>)
                }
            </div>
            <div className="input-group">
                <label htmlFor="enterprise">Empresa:</label>
                {isEditMode ?
                    (<input type="text" id="enterprise" name="enterprise" maxLength="20" value={enterprise} onChange={(event) => setEnterprise(event.target.value)} required/>) :
                    (<input type="text" id="enterprise" name="enterprise" maxLength="20" onChange={(event) => setEnterprise(event.target.value)} required/>)
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
                (<button className='warning'onClick={(e) => {
                    e.preventDefault()
                    handleFormCreateProject()}}>Editar Proyecto</button>):(
                <button className='btn-primary clean'onClick={(e) => {
                    e.preventDefault()
                    handleFormCreateProject()}}>Crear Proyecto</button>)
            }
        </form>
    </div>
  )
}

export default CreateProject
