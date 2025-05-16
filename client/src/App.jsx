import './App.css'
import { PaginatedBacklog } from "./components/PaginatedBacklog.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
const queryClient = new QueryClient()

function App() {
  return (
    <StrictMode>
      <QueryClientProvider client = {queryClient}>
        <PaginatedBacklog />
      </QueryClientProvider>
    </StrictMode>
  )

}

export default App
