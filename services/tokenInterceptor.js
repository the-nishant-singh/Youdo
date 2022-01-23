import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const getJwtToken = async () => {
  const token = await AsyncStorage.getItem('jwt_token') || null
  return token
}

const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    const token = await getJwtToken()
    config.headers = { 
      'Authorization': token,
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

export default axiosApiInstance
