import React, {createContext, useState, useContext, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosRequest from './tokenInterceptor'

const base_url = 'https://advanced-todo-backend.herokuapp.com/api/auth'
const base_url_user = 'https://advanced-todo-backend.herokuapp.com/api/user'


//Create the Auth Context
//and a empty object
const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const [authData, setAuthData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  const getUser = async () => {
    const userString = await AsyncStorage.getItem('user') || null
    const user = JSON.parse(userString)
    return user
  }

  const getJwtToken = async () => {
    const token = await AsyncStorage.getItem('jwt_token') || null
    return token
  }

  const loadStorageData = async () => {
    try {
      //Try get the data from Async Storage
      const token = await getJwtToken()
      const user = await getUser()

      if (user && token ) {
        setAuthData({ token, user });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const setUser = async (user, token) => {
    setAuthData({ user, token });
    await AsyncStorage.setItem('jwt_token', token)
    await AsyncStorage.setItem('user', JSON.stringify(user))
  }

  const Login = async (email, password) => {
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

  const Register = async (email, password, name) => {
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

  const SignOut = async () => {
    setAuthData(undefined);
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('jwt_token')
    return
  };

  const UpdateProfile = async (name) => {
    try{
      const update = { name }
      const url = `${base_url_user}/update-profile`
      const res = await axiosRequest.put(url, { update })
      const data = res.data
      console.log(data)
      await setUser(data.user, data.token)
      return data
    }catch(err){
      throw new Error(err.response.data.message)
    }
  }

  const SendResetPassEmail = async (email) => {
    try{
      const url = `${base_url}/send-reset-email`
      const res = await axios.post(url, { email })
      const data = res.data
      return data
    }catch(err){
      throw new Error(err.response.data.message)
    }
  }
  
  
  const UpdatePassword = async (currentPassword, newPassword) => {
    try{
      const passwordDetails = { currentPassword, newPassword }
      const url = `${base_url_user}/changePassword`
      const res = await axiosRequest.post(url, { passwordDetails })
      const data = res.data
      await setUser(data.user, data.token)
      return data
    }catch(err){
      throw new Error(err.response.data.message)
    }
  }

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{ authData, loading, Login, SignOut, Register, UpdateProfile, SendResetPassEmail, UpdatePassword, getJwtToken, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
export {AuthContext, AuthProvider, useAuth};