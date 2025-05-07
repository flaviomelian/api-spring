/**
 * Este archivo configura y exporta una instancia de axios para realizar solicitudes HTTP
 * a la API en el servidor backend.
 * 
 * @module api-instance
 */

import axios from 'axios'; // Se importa axios, que es una librería para hacer peticiones HTTP.

const api = axios.create({
    // Configuración de la instancia de axios.
    // Establece la URL base para todas las peticiones que se realicen con esta instancia.
    baseURL: 'http://localhost:8080/api/' // Dirección base de la API en el servidor local.
});

// Se exporta la instancia configurada de axios para que pueda ser utilizada en otros archivos.
export default api;
