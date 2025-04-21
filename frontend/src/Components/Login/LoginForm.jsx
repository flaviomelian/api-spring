import React from 'react'
import './Login.css';

const LoginForm = () => {
  return (
    <div className='login-form'>
        <h1>Iniciar sesión</h1>
            <form action="" method="post">
                <div className='login-form-group'>
                    <label htmlFor="email">Correo electrónico</label>
                    <input type="email" name="email" id="email"/>
                </div>
                <div className='login-form-group'>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name="password" id="password"/>
                </div>
                <div className='login-form-group'>
                    <button className='btn btn-primary clean' type="submit">Iniciar sesión</button>
                </div>
                <div className='login-form-group help'>
                    <p>¿No tienes una cuenta? <a href="/signup">Regístrate</a></p>
                    <p><a href="/forgot-password">¿Olvidó su contraseña?</a></p>
                </div>
        </form>
    </div>
  )
}

export default LoginForm
