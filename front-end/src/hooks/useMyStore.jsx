import { createContext, useContext, useState } from "react"


const StoreContext = createContext()


export const AppProvider = ({children}) => {

  const [store, setStoreState] = useState(() => {
    const saved = sessionStorage.getItem("globalStore")
    return saved ? JSON.parse(saved) : {}
  });

  const setStore = (key, value) => {
    setStoreState((prev) => {
        const updated = {...prev, [key]: value}
        sessionStorage.setItem("globalStore", JSON.stringify(updated))
        return updated
    })
  }
  
  return (
    <StoreContext.Provider value={{store, setStore}}>
        {children}
    </StoreContext.Provider>
  )
}


export const useMyStore = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useAppContext must be used inside an ")
  };

  return context
}





