import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();
const ProjectContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};

export const ProjectProvider = ({ children }) => {
    const [projectData, setProjectData] = useState(null);

    return (
        <ProjectContext.Provider value={{ projectData, setProjectData }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjectContext = () => {
    return useContext(ProjectContext);
};
