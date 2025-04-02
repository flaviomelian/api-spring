import api from './index'

export const getAllUsers = async () => {
    const { data }  = await api.get('users/')
    return data
}

export const createUser = async (dataUser) => {
    const  {data} = await api.post('users/', dataUser)
    return data
}

export const deleteUser = async (id) => {
    console.log(id)
    const  {data} = await api.delete('users/', id)
    return data
}