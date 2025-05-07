/**
 * Entry point de la aplicación React.
 * 
 * - Este archivo es el punto de inicio para la aplicación React. 
 * - Utiliza ReactDOM para renderizar la aplicación dentro del HTML, 
 *   donde se encuentra el div con el id 'root'.
 * - Se importa el componente principal `App` y el archivo de estilos `index.css`.
 * 
 * @module index
 */

import { StrictMode } from "react"; // StrictMode es una herramienta para detectar posibles problemas en la aplicación durante el desarrollo.
import { createRoot } from "react-dom/client"; // createRoot es el nuevo método para crear una raíz de la aplicación a partir de React 18.
import App from "./App.jsx"; // El componente principal de la aplicación.
import "./index.css"; // Importa los estilos globales de la aplicación.

/**
 * Se crea una raíz en el DOM en el elemento con id 'root' y se renderiza el componente `App`.
 * Este es el componente raíz de la aplicación y es el punto de entrada para el flujo completo.
 */
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App /> {/* Renderiza el componente principal App dentro de StrictMode */}
    </StrictMode>
);
