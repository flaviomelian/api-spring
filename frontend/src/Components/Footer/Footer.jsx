import React from 'react'
import './Footer.css'
import github from './../../assets/github.jpg'

const Footer = () => {
    return (
        <div className='footer'>
            <h3>@flaviomelian</h3>
            <img className='github' src={github}/>
        </div>
    )
}

export default Footer