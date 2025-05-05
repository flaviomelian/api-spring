import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import './Submit.css';

const Submit = () => {
    const location = useLocation();
    const { name, surnames, phone, email } = location.state || {}; //Obtenemos los datos del estado
    useEffect(() => {
        fetch('http://localhost:8080/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(location.state),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }, [location.state]); // Dependencia para que se ejecute solo una vez al cargar el componente

    return (
        <div className="submit-container">
            <h2>Usuario registrado correctamente</h2>
            <h3>Datos registrados:</h3>
            <ul className="submit-list">
                <li>Nombre: {name}</li>
                <li>Apellido: {surnames}</li>
                <li>Teléfono: {phone}</li>
                <li>Correo: {email}</li>
            </ul>
            <div className="submit-help">
                <button className="clean submit">Volver a inicio</button>
                <button className="clean submit">Iniciar sesión</button>
            </div>
            
        </div>
    );
};

export default Submit;
