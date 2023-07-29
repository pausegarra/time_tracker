import React from 'react'
import { authService as _authSerivce } from '../services/auth.service'

export function useAuth (authService = _authSerivce) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [user, setUser] = React.useState({})

  const getUser = React.useCallback(async () => {
    try {
      const user = await authService.whoami();
      setUser(user);
      setIsAuthenticated(true);
    } catch (err) {
      setUser({});
      setIsAuthenticated(false);
    }
  }, [authService, setUser, setIsAuthenticated]);

  React.useEffect(() => {
    getUser()
  }, [authService, getUser])

  function refresh () {
    getUser()
  }

  return {
    isAuthenticated,
    user,
    refresh
  }
}