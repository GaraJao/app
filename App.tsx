import React from "react"
import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes } from "./src/routes";
import { StatusBar } from 'expo-status-bar';

export default function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar backgroundColor="#FFFDFC" style="dark"/>
      <Routes />
    </QueryClientProvider>
  )
}