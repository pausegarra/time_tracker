import { fetchService } from '@/shared/services/fetch.service'

class LoginService {
  constructor(httpClient) {
    this.httpClient = httpClient
  }

  async login (values) {
    await this.httpClient.post('/auth/login', values)
  }
}

export const loginService = new LoginService(fetchService)
