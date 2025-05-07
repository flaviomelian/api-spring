/**
 * Este archivo contiene funciones para interactuar con la API a través de solicitudes HTTP.
 * Cada función se encarga de hacer una petición específica a un recurso de la API (usuarios, proyectos, tareas).
 * 
 * @module services
 */

import api from './index'; // Se importa la instancia configurada de axios (api) para realizar las solicitudes HTTP.

/**
 * Obtiene todos los usuarios de la API.
 * Realiza una solicitud GET a la ruta 'users/'.
 * 
 * @returns {Promise<Object>} - Retorna los datos de los usuarios.
 */
export const getAllUsers = async () => {
    const { data } = await api.get('users/'); // Realiza la solicitud GET a la API para obtener los usuarios.
    return data; // Devuelve los datos obtenidos de la API.
}

/**
 * Crea un nuevo usuario en la API.
 * Realiza una solicitud POST a la ruta 'users/' con los datos del nuevo usuario.
 * 
 * @param {Object} dataUser - Los datos del usuario a crear.
 * @returns {Promise<void>} - No retorna nada, solo realiza la creación del usuario.
 */
export const createUser = async (dataUser) => {
    await api.post('users/', dataUser); // Envia una solicitud POST para crear un nuevo usuario.
}

/**
 * Elimina un usuario de la API.
 * Realiza una solicitud DELETE a la ruta 'users/{id}'.
 * 
 * @param {number} id - El ID del usuario a eliminar.
 * @returns {Promise<Object>} - Retorna los datos de la respuesta tras eliminar el usuario.
 */
export const deleteUser = async (id) => {
    const { data } = await api.delete(`users/${id}`); // Envia una solicitud DELETE para eliminar el usuario con el ID proporcionado.
    return data; // Devuelve la respuesta de la API (generalmente un mensaje de éxito).
}

/**
 * Actualiza un usuario en la API.
 * Realiza una solicitud PUT a la ruta 'users/{id}' con los datos actualizados del usuario.
 * 
 * @param {number} id - El ID del usuario a actualizar.
 * @param {Object} dataUser - Los nuevos datos del usuario.
 * @returns {Promise<Object>} - Retorna los datos actualizados del usuario.
 */
export const updateUser = async (id, dataUser) => {
    const { data } = await api.put(`users/${id}`, dataUser); // Envia una solicitud PUT para actualizar los datos del usuario.
    return data; // Devuelve los datos actualizados del usuario.
}

/**
 * Obtiene todos los proyectos de la API.
 * Realiza una solicitud GET a la ruta 'projects/'.
 * 
 * @returns {Promise<Object>} - Retorna los datos de los proyectos.
 */
export const getAllProjects = async () => {
    const { data } = await api.get('projects/'); // Realiza la solicitud GET a la API para obtener los proyectos.
    return data; // Devuelve los datos obtenidos de la API.
}

/**
 * Crea un nuevo proyecto en la API.
 * Realiza una solicitud POST a la ruta 'projects/' con los datos del nuevo proyecto.
 * 
 * @param {Object} dataProject - Los datos del proyecto a crear.
 * @returns {Promise<void>} - No retorna nada, solo realiza la creación del proyecto.
 */
export const createProject = async (dataProject) => {
    await api.post('projects/', dataProject); // Envia una solicitud POST para crear un nuevo proyecto.
}

/**
 * Elimina un proyecto de la API.
 * Realiza una solicitud DELETE a la ruta 'projects/{id}'.
 * 
 * @param {number} id - El ID del proyecto a eliminar.
 * @returns {Promise<Object>} - Retorna los datos de la respuesta tras eliminar el proyecto.
 */
export const deleteProject = async (id) => {
    const { data } = await api.delete(`projects/${id}`); // Envia una solicitud DELETE para eliminar el proyecto con el ID proporcionado.
    return data; // Devuelve la respuesta de la API (generalmente un mensaje de éxito).
}

/**
 * Actualiza un proyecto en la API.
 * Realiza una solicitud PUT a la ruta 'projects/{id}' con los datos actualizados del proyecto.
 * 
 * @param {number} id - El ID del proyecto a actualizar.
 * @param {Object} dataProject - Los nuevos datos del proyecto.
 * @returns {Promise<Object>} - Retorna los datos actualizados del proyecto.
 */
export const updateProject = async (id, dataProject) => {
    const { data } = await api.put(`projects/${id}`, dataProject, {
        headers: {
          'Content-Type': 'application/json', // Especifica que los datos enviados son en formato JSON.
        },
      });
    return data; // Devuelve los datos actualizados del proyecto.
}

/**
 * Obtiene todas las tareas de un proyecto específico.
 * Realiza una solicitud GET a la ruta 'tasks/project/{projectId}'.
 * 
 * @param {number} projectId - El ID del proyecto para obtener sus tareas.
 * @returns {Promise<Object>} - Retorna los datos de las tareas del proyecto.
 */
export const getAllTasksByProject = async (projectId) => {
    const { data } = await api.get(`tasks/project/${projectId}`); // Realiza la solicitud GET para obtener las tareas de un proyecto.
    return data; // Devuelve los datos obtenidos de la API.
}

/**
 * Obtiene una tarea específica de un proyecto.
 * Realiza una solicitud GET a la ruta 'tasks/project/{projectId}/{taskId}'.
 * 
 * @param {number} projectId - El ID del proyecto.
 * @param {number} id - El ID de la tarea que se desea obtener.
 * @returns {Promise<Object>} - Retorna los datos de la tarea.
 */
export const getTaskByIdByProject = async (projectId, id) => {
    const { data } = await api.get(`tasks/project/${projectId}/${id}`); // Realiza la solicitud GET para obtener una tarea específica.
    return data; // Devuelve los datos de la tarea obtenida.
}

/**
 * Crea una nueva tarea en la API.
 * Realiza una solicitud POST a la ruta 'tasks/' con los datos de la tarea.
 * 
 * @param {Object} dataTask - Los datos de la tarea a crear.
 * @returns {Promise<void>} - No retorna nada, solo realiza la creación de la tarea.
 */
export const createTask = async (dataTask) => {
    await api.post('tasks/', dataTask); // Envia una solicitud POST para crear una nueva tarea.
}

/**
 * Elimina una tarea de la API.
 * Realiza una solicitud DELETE a la ruta 'tasks/{id}'.
 * 
 * @param {number} id - El ID de la tarea a eliminar.
 * @returns {Promise<Object>} - Retorna los datos de la respuesta tras eliminar la tarea.
 */
export const deleteTask = async (id) => {
    const { data } = await api.delete(`tasks/${id}`); // Envia una solicitud DELETE para eliminar la tarea con el ID proporcionado.
    return data; // Devuelve la respuesta de la API (generalmente un mensaje de éxito).
}

/**
 * Actualiza una tarea en la API.
 * Realiza una solicitud PUT a la ruta 'tasks/{id}' con los datos actualizados de la tarea.
 * 
 * @param {number} id - El ID de la tarea a actualizar.
 * @param {Object} dataTask - Los nuevos datos de la tarea.
 * @returns {Promise<Object>} - Retorna los datos actualizados de la tarea.
 */
export const updateTask = async (id, dataTask) => {
    const { data } = await api.put(`tasks/${id}`, dataTask); // Envia una solicitud PUT para actualizar los datos de la tarea.
    return data; // Devuelve los datos actualizados de la tarea.
}

/**
 * Actualiza el estado de una tarea en la API.
 * Realiza una solicitud PUT a la ruta 'tasks/status/{id}' con el nuevo estado de la tarea.
 * 
 * @param {number} id - El ID de la tarea cuyo estado se desea actualizar.
 * @param {Object} dataTask - Los nuevos datos de la tarea (como el nuevo estado).
 * @returns {Promise<Object>} - Retorna los datos actualizados de la tarea.
 */
export const updateStatusTask = async (id, dataTask) => {
    const { data } = await api.put(`tasks/status/${id}`, dataTask); // Envia una solicitud PUT para actualizar el estado de la tarea.
    return data; // Devuelve los datos de la tarea con el estado actualizado.
}
