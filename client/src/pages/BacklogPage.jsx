import { useState, useEffect } from "react";
import { PaginatedBacklog } from "../components/PaginatedBacklog.jsx";

const projects = ["PGM3", "PGM4", "AtWork 2"];

function BacklogPage() {
  const [selectedProject, setSelectedProject] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [selectedProject]);

  let content;
  if (loading) {
    if (selectedProject) {
      content = (
        <div
          className="skeleton-block"
          style={{ minHeight: "30rem", width: "100dvh" }}
        ></div>
      );
    } else {
      content = projects.map((_, idx) => (
        <div
          key={idx}
          className="skeleton-block"
          style={{ minHeight: "30rem", width: "100dvh" }}
        ></div>
      ));
    }
  } else if (selectedProject) {
    content = <PaginatedBacklog project={selectedProject} />;
  } else {
    content = projects.map((project) => (
      <PaginatedBacklog key={project} project={project} />
    ));
  }

  return (
    <div>
      <div className="select select-project">
        <select
          className="select-dropdown"
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
      </div>
      <div className="backlog-container">{content}</div>
    </div>
  );
}

export default BacklogPage;