import React, { createContext, useState, useContext } from 'react';

// Crear un contexto para el usuario
const UserContext = createContext();

// Crear un proveedor para manejar los datos del usuario
export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook para acceder al contexto
export const useUserContext = () => {
    return useContext(UserContext);
};
