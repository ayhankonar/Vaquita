import React, {
  createContext, 
  useState,
  useEffect,
  useContext
} from 'react'
import {userProfileFn} from '../services/auth'
export const MyContext = createContext()

export const Provider = props => {
  const [user, setUser] = useState(null)

  //Para Login 
  const setCtxUser = user => setUser(user)

  //Para Logout 
  const clearCtxUser = () => setUser(null)

  // Callback para traer session info y perfil de usuario desde servicio 
  useEffect(() => {
    async function profile(){
      const {data: {user}} = await userProfileFn()
      setCtxUser(user)
      console.log(user)
    }
    profile()
  }, [])

  //FUNCIONES PARA MANEJAR TODO DEL USUARIO EN EL APP, CHILDREN ES EL ROUTER
  return (
    <MyContext.Provider {...props} value={{
      user,
      setCtxUser,
      clearCtxUser
    }}/>
  )
}

export const useContextInfo = () => useContext(MyContext)