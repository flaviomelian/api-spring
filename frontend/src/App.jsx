import { ProjectProvider, UserProvider, TaskProvider } from './Context/Context';
import { DndProvider } from 'react-dnd';  // Importar el proveedor de DnD
import { HTML5Backend } from 'react-dnd-html5-backend';
import router from './Routes/index'
import { RouterProvider } from 'react-router-dom'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <TaskProvider>
        <ProjectProvider>
          <UserProvider>
            <RouterProvider router={router}/>
          </UserProvider>
        </ProjectProvider>
      </TaskProvider>
    </DndProvider>
    
  );
}

export default App;
