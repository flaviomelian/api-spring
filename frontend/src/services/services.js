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