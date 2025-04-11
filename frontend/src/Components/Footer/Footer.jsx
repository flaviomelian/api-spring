import React from 'react'
import './Footer.css'
import github from './../../assets/github.jpg'

const Footer = () => {
    return (
        <div className='footer'>
            <h3>@flaviomelian</h3>
            <a className='to-github' href='https://github.com/flaviomelian'><img className='github' src={github}/></a>
        </div>
    )
}

export default Footer