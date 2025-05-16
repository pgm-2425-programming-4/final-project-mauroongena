import './App.css'
import { Tasks } from './Tasks.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
const queryClient = new QueryClient()

function App() {
  return (
    <StrictMode>
      <QueryClientProvider client = {queryClient}>
        <Tasks />
      </QueryClientProvider>
    </StrictMode>
  )

}

export default App
