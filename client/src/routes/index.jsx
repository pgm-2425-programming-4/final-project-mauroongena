import { createFileRoute } from "@tanstack/react-router";
import todoBanner from "../assets/images/todo_banner.png";

export const Route = createFileRoute("/")({
  component: () => (
    <div className="p-4">
      <h1>Welcome home</h1>
      <p>Choose a project to start</p>
      <img src={todoBanner} alt="Home Banner todo" />
    </div>
  ),
});
