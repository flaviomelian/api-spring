import React from 'react'
import casita from './../../assets/casita.png'
import team from './../../assets/team.jpg'
import code from './../../assets/code.png'
import './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <div>
                <img className='house' src={casita}/>
            </div>
            <div>
                <img className='team' src={team}/>
            </div>
            <div>       
                <img className='code' src={code}/>
            </div>
        </div>
    )
}

export default Header