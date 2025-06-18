import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div className="p-4">
      <h1>Welcome home</h1>
      <p>Choose a project to start</p>
    </div>
  ),
});
