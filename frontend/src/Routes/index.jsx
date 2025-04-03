import { createBrowserRouter } from 'react-router-dom'
import Root from '../layout/Root'
import Dashboard from '../Pages/Dashboard/Dashboard'
import CreateDev from '../Pages/CreateDev/CreateDev'
import CreateDevOK from '../Pages/CreateDevOK/CreateDevOK'
import CreateProject from '../Pages/CreateProject/CreateProject'
import CreateProjectOK from '../Pages/CreateProjectOK/CreateProjectOK'
import Team from '../Pages/Team/Team'
import Project from '../Pages/Project/Project'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/create-dev',
        element: <CreateDev />,
      },
      {
        path: '/team',
        element: <Team />,
      },
      {
        path: '/create-dev-ok',
        element: <CreateDevOK />,
      },
      {
        path: '/projects',
        element: <Project />,
      },
      {
        path: '/create-project',
        element: <CreateProject />,
      },
      {
        path: '/create-project-ok',
        element: <CreateProjectOK />,
      },
    ],
  },
])
export default router