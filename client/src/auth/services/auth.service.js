import { fetchService } from '@/shared/services/fetch.service'

class AuthService {
  constructor(httpClient) {
    this.httpClient = httpClient
  }

  async whoami () {
    const response = await this.httpClient.get('/auth/whoami')
    return response
  }
}

export const authService = new AuthService(fetchService)