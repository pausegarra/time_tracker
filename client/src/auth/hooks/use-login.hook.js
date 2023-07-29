import React from 'react';
import { useForm } from '@mantine/form';
import { loginService } from '../services/login.service';
import { useNavigate } from 'react-router-dom';
import { notificationsService } from '@/notifications/services/notifications.service';
import { httpErrorNames as _httpErrorNames } from '@/shared/http-error-codes';
import { authService as _authService } from '../services/auth.service';
import { AppContext } from '@/shared/contexts/app.context';

export function useLogin (httpErrorNames = _httpErrorNames, authService = _authService) {
  const nav = useNavigate()
  const [isLoadingAuth, setIsLoadingAuth] = React.useState(true)
  const { refresh } = React.useContext(AppContext)
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    }
  })

  React.useEffect(() => {
    authService.whoami()
      .then(() => nav('/topics'))
      .finally(() => setIsLoadingAuth(false))
  }, [nav, authService])

  async function handleLogin (values) {
    try {
      await loginService.login(values)
      refresh()
      nav('/topics')
    } catch (err) {
      if (err.name === httpErrorNames.UnprocessableEntity)
        return notificationsService.showFieldErrors(err.error.message)
      if (err.name === httpErrorNames.Unauthorized)
        return notificationsService.error({ title: 'Invalid credentials', message: 'Email or password incorrect' })

      notificationsService.unhandledError()
    }
  }

  return {
    form,
    isLoadingAuth,
    handleLogin
  }
}