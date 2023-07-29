import { Container, SimpleGrid } from '@mantine/core'
import { TotalsOfAllTime } from '../components/totals-all-time.component'
import TotalsToday from '../components/totals-today.component'

const breakpoints = [
  { maxWidth: '36rem', cols: 1 }
]

function ReportsPage () {
  return (
    <Container>
      <SimpleGrid cols={2} breakpoints={breakpoints}>
        <TotalsToday />
        <TotalsOfAllTime />
      </SimpleGrid>
    </Container>
  )
}

export default ReportsPage