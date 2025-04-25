import React from "react";
import { useLocation } from "react-router-dom";

const Submit = () => {
    const location = useLocation();
    const { name, surnames, phone, email } = location.state || {}; // Obtenemos los datos del estado

    return (
        <div>
            <h1>Usuario registrado correctamente</h1>
            <h2>Datos registrados:</h2>
            <ul>
                <li>Nombre: {name}</li>
                <li>Apellido: {surnames}</li>
                <li>Teléfono: {phone}</li>
                <li>Correo: {email}</li>
            </ul>
            <button>Confirmar datos</button>
        </div>
    );
};

export default Submit;
