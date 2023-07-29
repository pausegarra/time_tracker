import { authService as _authService } from '@/auth/services/auth.service'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export function Protected ({ children, authService = _authService }) {
  const [isLoadingAuth, setIsLoadingAuth] = React.useState(true)
  const nav = useNavigate()

  React.useEffect(() => {
    authService.whoami()
      .then(() => setIsLoadingAuth(false))
      .catch(() => nav('/'))
  }, [nav, authService])

  if (isLoadingAuth) return null

  return children
}
