import React from 'react'
import { logoutService as _logoutService } from '../services/logout.service'
import { notificationsService as _notificationsService } from '../../notifications/services/notifications.service'
import { useNavigate } from 'react-router-dom'
import {AppContext} from '@/shared/contexts/app.context'

export function useLogout (logoutService = _logoutService, notificationsService = _notificationsService) {
  const navigate = useNavigate()
  const {refresh} = React.useContext(AppContext)

  async function handleLogout () {
    try {
      await logoutService.logout()
      await refresh()
      navigate('/')
    } catch (err) {
      notificationsService.unhandledError()
    }
  }

  return {
    handleLogout
  }
}