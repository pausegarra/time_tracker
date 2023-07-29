import { Pie } from 'react-chartjs-2';
import { reportingService } from '../services/reporting.service';
import { getOptions } from '../config/chartjs.config'
import { useFetch } from '@/shared/hooks/use-fetch.hook';

export function TotalsOfAllTime () {
  const { data, isLoading } = useFetch(reportingService, 'getTotalsOfAllTime')
  const options = getOptions('Totals per topic of all time')

  return (
    <div>
      {isLoading === false && <Pie options={options} data={data} />}
    </div>
  )
}