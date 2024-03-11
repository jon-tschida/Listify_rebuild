import React from 'react'
import { createContext, useContext } from 'react'

const MyContext = createContext()

export default function ContextProvider({children}) {
    const [darkMode, setDarkMode] = React.useState(true)
  return (
    <MyContext.Provider value={{darkMode, setDarkMode}} >
      {children}
    </MyContext.Provider>
  )
}

export const useMyContext = () => useContext(MyContext)