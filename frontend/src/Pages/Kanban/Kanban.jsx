import React from 'react'
import './Kanban.css'

const Kanban = () => {
  return (
    <div className='kanban'>
        <div className='header-kanban'>
            <div className='to-do kanban-section'>
                <h1 className='kanban-section-header'>Por hacer</h1>
            </div>
            <div className='progress kanban-section'>
                <h1 className='kanban-section-header'>En progreso</h1>
            </div>
            <div className='review kanban-section'>
                <h1 className='kanban-section-header'>En revisión</h1>
            </div>
            <div className='done kanban-section'>
                <h1 className='kanban-section-header'>Hecho</h1>
            </div>
        </div>
    </div>
  )
}

export default Kanban
