import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PaginatedBacklog } from "../components/PaginatedBacklog.jsx";
import { getProjects } from "../components/queries/getProjects.jsx";

function BacklogPage() {
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: projectsResponse, isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const projects = projectsResponse?.data || [];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [selectedProjectId]);

  let content;
  if (loading || projectsLoading) {
    content = (
      <div
        className="skeleton-block"
        style={{ minHeight: "30rem", width: "100dvh" }}
      ></div>
    );
  } else if (selectedProjectId) {
    const selectedProject = projects.find(
      (p) => String(p.id) === String(selectedProjectId)
    );
    content = selectedProject ? (
      <PaginatedBacklog project={selectedProject} />
    ) : (
      <div>Project niet gevonden.</div>
    );
  } else {
    content = projects.map((project) => (
      <PaginatedBacklog key={project.id} project={project} />
    ));
  }

  return (
    <div>
      <div className="select select-project">
        <select
          className="select-dropdown"
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          disabled={projectsLoading}
        >
          <option value="">Alle projecten</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
      </div>
      <div className="backlog-container">{content}</div>
    </div>
  );
}

export default BacklogPage;
