import React, {
    createContext, 
    useState,
    useEffect
  } from 'react'
  import {userProfileFn} from '../services/auth'
  export const MyContext = createContext()

  export default function Provider({children}){
    const [user, setUser] = useState(null)

    const setCtxUser = user => setUser(user)
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
      <MyContext.Provider value={{
        user,
        setCtxUser,
        clearCtxUser
      }}>
        {children}
      </MyContext.Provider>
    )
  }