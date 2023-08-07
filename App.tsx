import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'

import { Routes } from './src/routes'
// import { light } from './src/styles/themes/light'
import { ThemeProvider } from './src/hooks/theme'

export default function App() {
  const queryClient = new QueryClient()

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        {/* <StatusBar backgroundColor={light.colors.background} style="dark" /> */}
        <Routes />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
