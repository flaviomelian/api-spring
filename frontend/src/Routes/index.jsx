/**
 * Este archivo configura las rutas de la aplicación utilizando `react-router-dom`.
 * Las rutas permiten a los usuarios navegar entre diferentes componentes (páginas)
 * basados en la URL en el navegador.
 * 
 * @module router-setup
 */

import { createBrowserRouter } from 'react-router-dom'; // Se importa la función createBrowserRouter de react-router-dom para configurar las rutas.
import Root from '../layout/Root'; // Importa el componente principal que envuelve las páginas hijas.
import Dashboard from '../Pages/Dashboard/Dashboard'; // Importa la página del Dashboard.
import CreateDev from '../Pages/CreateDev/CreateDev'; // Importa la página para crear un desarrollador.
import CreateDevOK from '../Pages/CreateDevOK/CreateDevOK'; // Página de confirmación tras crear un desarrollador.
import CreateProject from '../Pages/CreateProject/CreateProject'; // Importa la página para crear un proyecto.
import CreateProjectOK from '../Pages/CreateProjectOK/CreateProjectOK'; // Página de confirmación tras crear un proyecto.
import Team from '../Pages/Team/Team'; // Importa la página para ver el equipo.
import Project from '../Pages/Project/Project'; // Importa la página de detalles de un proyecto.
import CreateTask from '../Pages/CreateTask/CreateTask'; // Importa la página para crear una tarea.
import CreateTaskOK from '../Pages/CreateTaskOK/CreateTaskOK'; // Página de confirmación tras crear una tarea.
import Kanban from '../Pages/Kanban/Kanban'; // Importa la página del tablero Kanban.
import Home from '../Pages/Home/Home'; // Importa la página principal.
import HomeToken from '../Pages/HomeToken/HomeToken'; // Importa la página para la vista cuando el token está disponible.
import Code from '../Pages/Code/Code'; // Importa la página para ver el código.
import Report from '../Pages/Report/Report'; // Importa la página para ver los reportes.
import Signup from '../Pages/Signup/Signup'; // Importa la página de registro de usuario.
import Login from '../Pages/Login/Login'; // Importa la página de inicio de sesión.
import Submit from '../Pages/Submit/Submit'; // Importa la página para enviar la información.

const router = createBrowserRouter([  // Se crea el enrutador utilizando createBrowserRouter.
  {
    path: '/',  // La ruta base de la aplicación.
    element: <Root />,  // El componente principal que actúa como contenedor de las rutas hijas.
    children: [  // Las rutas hijas definidas dentro de la ruta principal.
      {
        path: '',  // Ruta base, que redirige a la página de HomeToken.
        element: <HomeToken />,
      },
      {
        path: '/login',  // Ruta para la página de login.
        element: <Login />,
      },
      {
        path: '/signup',  // Ruta para la página de registro.
        element: <Signup />,
      },
      {
        path: '/dashboard',  // Ruta para la página del dashboard.
        element: <Dashboard />,
      },
      {
        path: '/create-dev',  // Ruta para la página de crear un desarrollador.
        element: <CreateDev />,
      },
      {
        path: '/team',  // Ruta para la página de equipo.
        element: <Team />,
      },
      {
        path: '/create-dev-ok',  // Ruta de confirmación después de crear un desarrollador.
        element: <CreateDevOK />,
      },
      {
        path: '/projects',  // Ruta para la página de proyectos.
        element: <Project />,
      },
      {
        path: '/create-project',  // Ruta para la página de crear un proyecto.
        element: <CreateProject />,
      },
      {
        path: '/create-project-ok',  // Ruta de confirmación después de crear un proyecto.
        element: <CreateProjectOK />,
      },
      {
        path: '/create-task',  // Ruta para la página de crear una tarea.
        element: <CreateTask />,
      },
      {
        path: '/create-task-ok',  // Ruta de confirmación después de crear una tarea.
        element: <CreateTaskOK />,
      },
      {
        path: '/kanban',  // Ruta para la página del tablero Kanban.
        element: <Kanban />,
      },
      {
        path: '/code',  // Ruta para la página del código.
        element: <Code />,
      },
      {
        path: '/report',  // Ruta para la página de reportes.
        element: <Report />,
      },
      {
        path: '/submit',  // Ruta para la página de envío.
        element: <Submit />,
      },
    ],
  },
]);

// Se exporta la configuración de las rutas para que se pueda utilizar en el componente principal (App).
export default router;
