import { createBrowserRouter } from 'react-router-dom'
import Root from '../layout/Root'
import Dashboard from '../Pages/Dashboard/Dashboard'
import CreateDev from '../Pages/CreateDev/CreateDev'
import CreateDevOK from '../Pages/CreateDevOK/CreateDevOK'
import CreateProject from '../Pages/CreateProject/CreateProject'
import CreateProjectOK from '../Pages/CreateProjectOK/CreateProjectOK'
import Team from '../Pages/Team/Team'
import Project from '../Pages/Project/Project'
import CreateTask from '../Pages/CreateTask/CreateTask'
import CreateTaskOK from '../Pages/CreateTaskOK/CreateTaskOK'
import Kanban from '../Pages/Kanban/Kanban'
import Home from '../Pages/Home/Home'
import Code from '../Pages/Code/Code'
import Report from '../Pages/Report/Report'
import Signup from '../Pages/Signup/Signup'
import Login from '../Pages/Login/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
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
      {
        path: '/create-task',
        element: <CreateTask />,
      },
      {
        path: '/create-task-ok',
        element: <CreateTaskOK />,
      },
      {
        path: '/kanban',
        element: <Kanban />,
      },
      {
        path: '/code',
        element: <Code />,
      },
      {
        path: '/report',
        element: <Report />,
      },
    ],
  },
])
export default router