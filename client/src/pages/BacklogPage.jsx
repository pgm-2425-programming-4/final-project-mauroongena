import { useState } from "react";
import { PaginatedBacklog } from "../components/PaginatedBacklog.jsx";

const projects = ["PGM3", "PGM4", "AtWork 2"];

function BacklogPage() {
  const [selectedProject, setSelectedProject] = useState("");
  let content;

  if (selectedProject) {
    content = <PaginatedBacklog project={selectedProject} />;
  } else {
    content = projects.map((project) => (
      <PaginatedBacklog key={project} project={project} />
    ));
  }

  return (
    <div>
      <select
        value={selectedProject}
        onChange={(e) => setSelectedProject(e.target.value)}
      >
        <option value="">Alle projecten</option>
        {projects.map((project) => (
          <option key={project} value={project}>
            {project}
          </option>
        ))}
      </select>
      <div className="backlog-container">{content}</div>
    </div>
  );
}

export default BacklogPage;
