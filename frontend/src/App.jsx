import { ProjectProvider, UserProvider } from './Context/Context';
import Project from './Pages/Project/Project';
import router from './Routes/index'
import { RouterProvider } from 'react-router-dom'

function App() {
  return (
    <ProjectProvider>
      <UserProvider>
        <RouterProvider router={router}/>
      </UserProvider>
    </ProjectProvider>
  );
}

export default App;
