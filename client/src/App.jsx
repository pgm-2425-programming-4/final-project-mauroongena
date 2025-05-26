import "./App.css";
import { PaginatedBacklog } from "./components/PaginatedBacklog.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { Outlet } from "@tanstack/react-router";

const queryClient = new QueryClient();

function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;