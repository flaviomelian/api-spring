import api from './index'

export const getAllUsers = async () => {
    const { data }  = await api.get('users/')
    return data
}

export const createUser = async (dataUser) => {
    await api.post('users/', dataUser)
}

export const deleteUser = async (id) => {
    const {data} = await api.delete(`users/${id}`)
    return data
}

export const updateUser = async (id, dataUser) => {
    const {data} = await api.put(`users/${id}`, dataUser)
    return data
}

export const getAllProjects = async () => {
    const { data }  = await api.get('projects/')
    return data
}

export const createProject = async (dataProject) => {
    await api.post('projects/', dataProject)
}

export const deleteProject = async (id) => {
    const {data} = await api.delete(`projects/${id}`)
    return data
}

export const updateProject = async (id, dataProject) => {
    const {data} = await api.put(`projects/${id}`, dataProject)
    return data
}