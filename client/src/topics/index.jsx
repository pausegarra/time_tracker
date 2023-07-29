import { Protected } from '@/shared/components/protected.component'
import { Route, Routes } from 'react-router-dom'
import TopicsPage from './pages/topics.page'
import ErrorBoundary from '@/shared/components/error-boundary.component'

function TopicModule () {
  return <>
    <Routes>
      <Route
        path='/topics'
        element={
          <ErrorBoundary>
            <Protected>
              <TopicsPage />
            </Protected>
          </ErrorBoundary>
        }
      />
    </Routes>
  </>
}

export default TopicModule