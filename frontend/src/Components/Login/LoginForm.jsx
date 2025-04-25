import React from 'react'
import './Login.css';

const LoginForm = () => {
    const handleLogin = () => {
        //localStorage.setItem('usuario', )
    }
    return (
        <div className='login-form'>
            <form action="" method="post">
                <div className='login-form-group'>
                    <h1>Iniciar sesión</h1>
                    <input type="email" name="email" id="email" placeholder='correo electrónico' />
                    <input type="password" name="password" id="password" placeholder='contraseña' />
                    <button className='btn btn-primary clean' type="submit">Iniciar sesión</button>
                </div>
                <div className='login-form-help'>
                    <p>¿No tienes una cuenta? <a href="/signup">Regístrate</a></p>
                    <p><a href="/forgot-password">¿Olvidó su contraseña?</a></p>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
