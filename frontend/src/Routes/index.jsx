import { createBrowserRouter } from 'react-router-dom'
import Root from '../layout/Root'
import Dashboard from '../Pages/Dashboard/Dashboard'
import CreateDev from '../Pages/CreateDev/CreateDev'
import CreateDevOK from '../Pages/CreateDevOK/CreateDevOK'
import Team from '../Pages/Team/Team'

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
    ],
  },
])
export default router