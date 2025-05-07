/**
 * Este archivo define varios contextos utilizando la API de Context de React para manejar el estado global de la aplicación.
 * Cada contexto tiene un proveedor (Provider) y un hook personalizado para acceder a su valor (useContext).
 * 
 * Los contextos disponibles son:
 * - UserContext: Para manejar la información del usuario.
 * - ProjectContext: Para manejar la información del proyecto.
 * - TaskContext: Para manejar la información de las tareas.
 * - SignupContext: Para manejar la información relacionada con el registro del usuario.
 * 
 * @module context-setup
 */

import React, { createContext, useState, useContext } from 'react';

// Se crean los contextos para los diferentes estados
const UserContext = createContext();  // Contexto para la información del usuario.
const ProjectContext = createContext();  // Contexto para la información del proyecto.
const TaskContext = createContext();  // Contexto para la información de las tareas.
const SignupContext = createContext();  // Contexto para la información del registro de usuario.

 /**
  * Proveedor de contexto para el usuario.
  * @param {Object} children - Los componentes que consumirán este contexto.
  * @returns {React.Component} El proveedor de contexto con el valor del usuario.
  */
export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);  // Estado que guarda los datos del usuario.

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};

/**
 * Hook personalizado para acceder al contexto de usuario.
 * @returns {Object} El valor del contexto de usuario (userData y setUserData).
 */
export const useUserContext = () => {
    return useContext(UserContext);  // Retorna el valor del UserContext.
};

/**
 * Proveedor de contexto para el proyecto.
 * @param {Object} children - Los componentes que consumirán este contexto.
 * @returns {React.Component} El proveedor de contexto con el valor del proyecto.
 */
export const ProjectProvider = ({ children }) => {
    const [projectData, setProjectData] = useState(null);  // Estado que guarda los datos del proyecto.

    return (
        <ProjectContext.Provider value={{ projectData, setProjectData }}>
            {children}
        </ProjectContext.Provider>
    );
};

/**
 * Hook personalizado para acceder al contexto de proyecto.
 * @returns {Object} El valor del contexto de proyecto (projectData y setProjectData).
 */
export const useProjectContext = () => {
    return useContext(ProjectContext);  // Retorna el valor del ProjectContext.
};

/**
 * Proveedor de contexto para las tareas.
 * @param {Object} children - Los componentes que consumirán este contexto.
 * @returns {React.Component} El proveedor de contexto con el valor de las tareas.
 */
export const TaskProvider = ({ children }) => {
    const [taskData, setTaskData] = useState(null);  // Estado que guarda los datos de las tareas.

    return (
        <TaskContext.Provider value={{ taskData, setTaskData }}>
            {children}
        </TaskContext.Provider>
    );
};

/**
 * Hook personalizado para acceder al contexto de tareas.
 * @returns {Object} El valor del contexto de tareas (taskData y setTaskData).
 */
export const useTaskContext = () => {
    return useContext(TaskContext);  // Retorna el valor del TaskContext.
};

/**
 * Proveedor de contexto para el registro de usuario.
 * @param {Object} children - Los componentes que consumirán este contexto.
 * @returns {React.Component} El proveedor de contexto con el valor del registro.
 */
export const SignupProvider = ({ children }) => {
    const [signupData, setSignupData] = useState(null);  // Estado que guarda los datos del registro.

    return (
        <SignupContext.Provider value={{ signupData, setSignupData }}>
            {children}
        </SignupContext.Provider>
    );
};

/**
 * Hook personalizado para acceder al contexto de registro de usuario.
 * @returns {Object} El valor del contexto de registro (signupData y setSignupData).
 */
export const useSignupContext = () => {
    return useContext(SignupContext);  // Retorna el valor del SignupContext.
};
