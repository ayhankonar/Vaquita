import React, {
    createContext, 
    useContext, 
    useState, 
    useEffect
  } from 'react'
  import { currentUserFn } from '../services/auth'

  export const AppContext = createContext()

  export const AppCtxProvider = props =>{
    const [user, setUser] = useState(null)
    
    useEffect(() => {
      async function getSessionData() {
        const {data} = await currentUserFn()
        login(data)
      }
      getSessionData()
    }, [])

    const login = userInfo => setUser(userInfo)

    const logout = () => setUser(null)

    const value = {user, login, logout}

    return (
      <AppContext.Provider {...props} value={value}/>
    )
  }
  //Un custom hook para evitar consumir en cada componente nuestro ctx
  export const useContextInfo = () => useContext(AppContext)
