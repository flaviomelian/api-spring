import React from 'react'
import './Signup.css';

const SignupForm = () => {
  return (
    <div>
        <h2 className='signup-header'>Registro</h2>
        <form className='signup-form' action="/submit" method="POST">
          <div className='signup-form-group'>
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required/>
          </div>
          <div className='signup-form-group'>
            <label for="apellido">Apellido:</label>
            <input type="text" id="apellido" name="apellido" required/>
          </div>
          <div className='signup-form-group'>
            <label for="telefono">Número de Teléfono:</label>
            <input type="tel" id="telefono" name="telefono" required pattern="[0-9]{10}" placeholder="Ej. 5512345678"/>
          </div>
          <div className='signup-form-group'>
            <label for="correo">Correo Electrónico:</label>
            <input type="email" id="correo" name="correo" required/>
          </div>
          <div className='signup-form-group'>
            <label for="contrasena">Contraseña:</label>
            <input type="password" id="contrasena" name="contrasena" required/>
          </div>
            <button className='btn-primary primary clean signup-btn' type="submit">Registrarse</button>
        </form>

    </div>
  )
}

export default SignupForm
