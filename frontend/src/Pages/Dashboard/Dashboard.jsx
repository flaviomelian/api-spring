import './Dashboard.css'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const navigate = useNavigate()

    return (
        <div className='dashboard'>
            <button className='btn primary clean' onClick={() => navigate("../team")}>Equipo de desarrollo</button>
            <button className='btn primary clean' onClick={() => navigate("../projects")}>Proyectos</button>
        </div>
    )
}

export default Dashboard
