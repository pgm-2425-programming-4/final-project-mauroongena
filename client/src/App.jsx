import "./App.css";
import { PaginatedBacklog } from "./components/PaginatedBacklog.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";

const queryClient = new QueryClient();

const projects = ["PGM3", "PGM4", "AtWork 2"];

function App() {

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        {projects.map((project) => (
          <PaginatedBacklog key={project} project={project} />
        ))}
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;
