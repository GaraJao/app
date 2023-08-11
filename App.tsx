import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider } from './src/hooks/theme'
import { AuthProvider } from './src/hooks/auth'
import { Router } from './src/routes/Router'

export default function App() {
  const queryClient = new QueryClient()

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
