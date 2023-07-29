import { fetchService } from '@/shared/services/fetch.service'

export class ReportingService {
  constructor(httpClient) {
    this.httpClient = httpClient
  }

  async getTotalsOfAllTime () {
    const data = await this.httpClient.get('/reports/totals-of-all-time')

    return this.parseChartData(data)
  }

  async getTotalsOfToday () {
    const data = await this.httpClient.get('/reports/today')
    return this.parseChartData(data)
  }

  parseChartData (data) {
    const labels = this.obtainLabels(data)
    const values = this.parseValues(data)
    const colors = this.getColors(data)

    return {
      labels,
      datasets: [
        {
          label: '',
          data: values,
          backgroundColor: colors,
        }
      ]
    }
  }

  getColors (data) {
    return data.map(topic => topic.topic.color)
  }

  parseValues (data) {
    return data.map(topic => topic.total)
  }

  obtainLabels (data) {
    const labels = new Set()
    data.forEach(topic => {
      labels.add(topic.topic.name)
    });
    return Array.from(labels)
  }
}

export const reportingService = new ReportingService(fetchService)