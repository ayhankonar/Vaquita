import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development' ?
  'http://localhost:3000/' :
  '/'

const authService = axios.create({baseURL, withCredentials: true })

export const signupFn = async user => {
  return await authService.post('/signup', user)
}

export const loginFn = async user => {
  return await authService.post('/login', user)
}

//GET CURRENT USER
export const userProfileFn = async () => {
  return await authService.get(`/profile`)
}  

//EDITAR PERFIL
export const userProfileEdit = async () => {
  return await authService.put('/profile')
}

export const logoutFn = async () => {
  return await authService.get('/logout')
}