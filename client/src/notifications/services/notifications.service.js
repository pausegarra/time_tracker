import { notifications } from '@mantine/notifications'

class NotificationService {
  constructor(notifications) {
    this.notifications = notifications
  }

  error ({ title, message = '', autoClose = 5000 }) {
    this.notifications.show({
      title,
      message,
      color: 'red',
      autoClose
    })
  }

  success ({ title, message = '', autoClose = 5000 }) {
    this.notifications.show({
      title,
      message,
      color: 'green',
      autoClose
    })
  }

  showFieldErrors (errors) {
    errors.forEach(error => {
      this.error({ title: 'Some fields need your attention', message: error, autoClose: false })
    })
  }

  unhandledError () {
    this.error({ title: 'Unahndled error!', message: 'An unhandled error has ocurred' })
  }
}

export const notificationsService = new NotificationService(notifications)