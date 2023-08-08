import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Routes } from './src/routes'
import { ThemeProvider } from './src/hooks/theme'

export default function App() {
  const queryClient = new QueryClient()

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
