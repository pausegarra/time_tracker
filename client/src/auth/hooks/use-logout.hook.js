import { logoutService as _logoutService } from '../services/logout.service'
import { notificationsService as _notificationsService } from '../../notifications/services/notifications.service'
import { useNavigate } from 'react-router-dom'

export function useLogout (logoutService = _logoutService, notificationsService = _notificationsService) {
  const navigate = useNavigate()

  async function handleLogout () {
    try {
      await logoutService.logout()
      navigate('/')
    } catch (err) {
      notificationsService.unhandledError()
    }
  }

  return {
    handleLogout
  }
}