import React, { createContext, useState } from 'react'

const stateContext = createContext();

const getFreshContext = () => {
    return {
        user:0,
        timeTaken:0,
        selectedOptions: []
    }
}

export function ContextProvider({children}) {
    const [context, setContext] = useState(getFreshContext())
  return (
    <stateContext.Provider value = {{context, setContext}}>
        {children}
    </stateContext.Provider>
  )
}
