import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();
const ProjectContext = createContext();
const TaskContext = createContext();
const SignupContext = createContext();

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

export const TaskProvider = ({ children }) => {
    const [taskData, setTaskData] = useState(null);

    return (
        <TaskContext.Provider value={{ taskData, setTaskData }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    return useContext(TaskContext);
};

export const SignupProvider = ({ children }) => {
    const [signupData, setSignupData] = useState(null);

    return (
        <SignupContext.Provider value={{ signupData, setSignupData }}>
            {children}
        </SignupContext.Provider>
    );
};

export const useSignupContext = () => {
    return useContext(SignupContext);
};