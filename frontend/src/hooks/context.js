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

  //Para REFRESCAR LOS DATOS 
  const updateCtxUser = user => setUser(user)

  //Para Logout 
  const clearCtxUser = () => setUser(null)

  // Callback para traer session info y perfil de usuario desde servicio 
  useEffect(() => {
    async function profile(){

      const {data} = await userProfileFn(user)
      setCtxUser(data)

    }
    profile()
  }, [])

  //FUNCIONES PARA MANEJAR TODO DEL USUARIO EN EL APP, CHILDREN ES EL ROUTER
  return (
    <MyContext.Provider {...props} value={{
      user,
      setCtxUser,
      updateCtxUser,
      clearCtxUser
    }}/>
  )
}

export const useContextInfo = () => useContext(MyContext)
