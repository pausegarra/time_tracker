import { fetchService } from '@/shared/services/fetch.service'

class LogoutService {
  constructor(httpClient) {
    this.httpClient = httpClient
  }

  async logout () {
    await this.httpClient.post('/auth/logout')
  }
}

export const logoutService = new LogoutService(fetchService)