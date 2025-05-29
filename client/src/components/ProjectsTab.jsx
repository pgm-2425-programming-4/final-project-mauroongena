function ProjectsTab({ projects, projectsLoading, selectedProjectId, setSelectedProjectId }) {
  return (
    <aside className="projects-tab">
      <h2 className="projects-tab__title">Projects</h2>
      {projectsLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {projects.map((project) => (
            <li
              key={project.id}
              onClick={() => setSelectedProjectId(project.id)}
              className={selectedProjectId === project.id ? "selected-project" : ""}
              style={{ cursor: "pointer" }}
            >
              {project.title}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default ProjectsTab;