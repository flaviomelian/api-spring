import api from './index'

export const getAllUsers = async () => {
    const {data}  = await api.get('users/')
    console.log(data)
    return data
}