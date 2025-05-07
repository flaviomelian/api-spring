/**
 * Componente principal de la aplicación.
 * 
 * - Este componente envuelve toda la aplicación con varios proveedores de contexto 
 *   que proporcionan información global a los diferentes componentes de la aplicación.
 * - También se configura el soporte para "Drag and Drop" (DnD) utilizando la librería 
 *   `react-dnd` y el `HTML5Backend`.
 * 
 * @module App
 */

import { ProjectProvider, UserProvider, TaskProvider } from './Context/Context'; // Proveedores de contexto personalizados para proyectos, usuarios y tareas
import { DndProvider } from 'react-dnd';  // Importar el proveedor de DnD, necesario para habilitar el soporte de arrastre y soltado.
import { HTML5Backend } from 'react-dnd-html5-backend'; // Backend de DnD que permite utilizar el modelo de arrastrar y soltar basado en HTML5.
import router from './Routes/index'; // El archivo de rutas que contiene la configuración del enrutador de la aplicación.
import { RouterProvider } from 'react-router-dom'; // Proveedor de rutas de React Router para gestionar las rutas de la aplicación.

/**
 * Componente App que sirve como envoltorio para toda la aplicación.
 * 
 * - Envuelve la aplicación en varios proveedores que permiten compartir datos a través de toda la aplicación.
 * - Utiliza `DndProvider` para habilitar la funcionalidad de "arrastrar y soltar".
 * - Usa `RouterProvider` para proporcionar las rutas definidas en el archivo `router`.
 */
function App() {
  return (
    // Proveedor de "Drag and Drop" (DnD) que utiliza el backend HTML5
    <DndProvider backend={HTML5Backend}>
      {/* Proveedor de tareas, proporciona estado global relacionado con las tareas */}
      <TaskProvider>
        {/* Proveedor de proyectos, proporciona estado global relacionado con los proyectos */}
        <ProjectProvider>
          {/* Proveedor de usuarios, proporciona estado global relacionado con los usuarios */}
          <UserProvider>
            {/* Proveedor de rutas para gestionar la navegación */}
            <RouterProvider router={router}/>
          </UserProvider>
        </ProjectProvider>
      </TaskProvider>
    </DndProvider>
  );
}

export default App;
