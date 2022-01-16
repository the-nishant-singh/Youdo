import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const base_url = 'https://advanced-todo-backend.herokuapp.com/api/auth'

export const setUser = async (user, token) => {
  await AsyncStorage.setItem('jwt_token', token)
  await AsyncStorage.setItem('user', JSON.stringify(user))
}

export const getUser = async () => {
  const userString = await AsyncStorage.getItem('user') || ""
  const user = JSON.parse(userString)
  return user
}

export const getJwtToken = async () => {
  const token = await AsyncStorage.getItem('jwt_token') || ""
  return token
}

export const Login = async (email, password) => {
  try{
    const user = { email, password }
    const url = `${base_url}/login`
    const res = await axios.post(url, { user })
    const data = res.data
    await setUser(data.user, data.token)
    return data
  }catch(err){
    throw new Error(err.response.data.message)
  }
}

export const Register = async (email, password, name) => {
  try{
    const user = { email, password, name }
    const url = `${base_url}/register`
    const res = await axios.post(url, { user })
    const data = res.data
    await setUser(data.user, data.token)
    return data
  }catch(err){
    throw new Error(err.response.data.message)
  }
}

export const SendResetPassEmail = async (email) => {
  try{
    const url = `${base_url}/send-reset-email`
    const res = await axios.post(url, { email })
    const data = res.data
    return data
  }catch(err){
    throw new Error(err.response.data.message)
  }
}