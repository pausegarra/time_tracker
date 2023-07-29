import { BrowserRouter } from 'react-router-dom'
import { AuthModule } from './auth/auth.module'
import { MantineProvider } from '@mantine/core'
import { NotificationModule } from './notifications'
import TopicModule from './topics'
import ErrorBoundary from './shared/components/error-boundary.component'
import { Layout } from './shared/components/navbar.component'
import { AppContextProvider } from './shared/contexts/app.context'
import ReportingModule from './reporting'

function App () {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{
      colorScheme: 'dark'
    }}>
      <ErrorBoundary>
        <AppContextProvider>
          <NotificationModule />
          <BrowserRouter>
            <Layout>
              <AuthModule />
              <TopicModule />
              <ReportingModule />
            </Layout>
          </BrowserRouter>
        </AppContextProvider>
      </ErrorBoundary>
    </MantineProvider>
  )
}

export default App
