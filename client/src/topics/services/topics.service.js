import { fetchService } from '@/shared/services/fetch.service'

class TopicService {
  constructor(httpClient) {
    this.httpClient = httpClient
  }

  async createTopic (values) {
    const topic = await this.httpClient.post('/topics', values)
    return topic
  }

  async getMyTopics () {
    const topics = await this.httpClient.get('/topics')
    return topics
  }

  async deleteTopic (topicId) {
    return await this.httpClient.delete(`/topics/${topicId}`)
  }

  async editTopic (topicId, values) {
    return await this.httpClient.put(`/topics/${topicId}`, values)
  }

  async activateTopic (topicId) {
    return await this.httpClient.post(`/topics/${topicId}/activate`)
  }

  async getCurrentActive () {
    const { current } = await this.httpClient.get('/topics/current')
    return current
  }

  calculateElapsedTime (milliseconds) {
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / 1000 / 60) % 60;
    const hours = Math.floor(milliseconds / 1000 / 60 / 60) % 24;
    const days = Math.floor(milliseconds / 1000 / 60 / 60 / 24);

    return {
      seconds,
      minutes,
      hours,
      days
    };
  }
}

export const topicService = new TopicService(fetchService)
