import { Pie } from 'react-chartjs-2';
import { reportingService } from '../services/reporting.service';
import { getOptions } from '../config/chartjs.config'
import { useFetch } from '@/shared/hooks/use-fetch.hook';

function TotalsToday () {
  const { data, isLoading } = useFetch(reportingService, 'getTotalsOfToday')
  const options = getOptions('Totals per topic of today')

  return (
    <div>
      {isLoading === false && <Pie options={options} data={data} />}
    </div>
  )
}

export default TotalsToday