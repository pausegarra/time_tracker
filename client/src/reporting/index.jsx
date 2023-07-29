import ErrorBoundary from '@/shared/components/error-boundary.component'
import { Protected } from '@/shared/components/protected.component'
import { Route, Routes } from 'react-router-dom'
import ReportsPage from './pages/reports.page'

function ReportingModule () {
  return (
    <Routes>
      <Route path='/reports' element={
        <ErrorBoundary>
          <Protected>
            <ReportsPage />
          </Protected>
        </ErrorBoundary>
      } />
    </Routes>
  )
}

export default ReportingModule