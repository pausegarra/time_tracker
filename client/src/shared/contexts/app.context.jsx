import { useAuth } from '@/auth/hooks/use-auth.hook'
import React from 'react'

export const AppContext = React.createContext()

export function AppContextProvider ({ children }) {
  const { isAuthenticated, user, refresh } = useAuth()

  return (
    <AppContext.Provider value={{ isAuthenticated, user, refresh }} >
      {children}
    </AppContext.Provider >
  )
}