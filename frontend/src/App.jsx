import { ProjectProvider, UserProvider, TaskProvider } from './Context/Context';
import Project from './Pages/Project/Project';
import router from './Routes/index'
import { RouterProvider } from 'react-router-dom'

function App() {
  return (
    <TaskProvider>
      <ProjectProvider>
        <UserProvider>
          <RouterProvider router={router}/>
        </UserProvider>
      </ProjectProvider>
    </TaskProvider>
  );
}

export default App;
