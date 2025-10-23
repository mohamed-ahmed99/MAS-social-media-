import { createContext, useContext, useState } from 'react'


const createUserContext = createContext()


export function UserProvider({children}) {

    const [userData, setUserData] = useState({})

    return (
        <createUserContext.Provider value={{userData, setUserData}}>
            {children}
        </createUserContext.Provider>
    )
}


export const useUserContext = () => {
    const context = useContext(createUserContext)
    return context
}
