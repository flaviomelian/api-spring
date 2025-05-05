import React from 'react'
import { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [name, setName] = useState('');
  const [surnames, setSurnames] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <form className='signup-form' method="POST">
        <div className='signup-form-group'>
          <h1>Registro</h1>
          <input type="text" id="usuario" name="usuario" placeholder="usuario" onChange={(e) => setUsername(e.target.value)} required />
          <input type="text" id="nombre" name="nombre" placeholder="nombre" onChange={(e) => setName(e.target.value)} required />
          <input type="text" id="apellido" name="apellido" placeholder="apellidos" onChange={(e) => setSurnames(e.target.value)} required />
          <input type="phone" id="telefono" name="telefono" pattern="[0-9]{9, 10}" placeholder="número de telefono" onChange={(e) => setPhone(e.target.value)} required />
          <input type="email" id="correo" name="correo" placeholder="correo electrónico" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" id="contrasena" name="contrasena" placeholder="contraseña" onChange={(e) => setPassword(e.target.value)} required />
          <button className='btn-primary primary clean signup-btn' type="submit" onClick={(e) => { e.preventDefault(); navigate('/submit', { state: { username, name, surnames, phone, email, password }, }) }}>Registrarse</button>
          <label>¿Ya tienes una cuenta? <a href='/login'>Inicia sesión</a></label>
        </div>
      </form>

    </div>
  )
}

export default SignupForm
