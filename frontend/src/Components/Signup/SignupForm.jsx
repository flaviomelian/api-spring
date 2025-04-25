import React from 'react'
import { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [surnames, setSurnames] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
        <h2 className='signup-header'>Registro</h2>
        <form className='signup-form' method="POST">
          <div className='signup-form-group'>
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" onChange={(e) => setName(e.target.value)} required/>
          </div>
          <div className='signup-form-group'>
            <label for="apellido">Apellido:</label>
            <input type="text" id="apellido" name="apellido" onChange={(e) => setSurnames(e.target.value)} required/>
          </div>
          <div className='signup-form-group'>
            <label for="telefono">Número de Teléfono:</label>
            <input type="phone" id="telefono" name="telefono" pattern="[0-9]{9, 10}" placeholder="Ej. 5512345678" onChange={(e) => setPhone(e.target.value)} required/>
          </div>
          <div className='signup-form-group'>
            <label for="correo">Correo Electrónico:</label>
            <input type="email" id="correo" name="correo" onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div className='signup-form-group'>
            <label for="contrasena">Contraseña:</label>
            <input type="password" id="contrasena" name="contrasena" onChange={(e) => setPassword(e.target.value)} required/>
          </div>
            <button className='btn-primary primary clean signup-btn' type="submit" onClick={ (e) => {e.preventDefault(); navigate('/submit', { state: { name, surnames, phone, email, password }, })}}>Registrarse</button>
        </form>

    </div>
  )
}

export default SignupForm
