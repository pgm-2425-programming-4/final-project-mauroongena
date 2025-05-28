import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getProjects } from "../components/queries/getProjects.jsx";
import { getTaskLabels } from "../components/queries/getTaskLabels.jsx";
import { getAllTasks } from "../components/queries/getAllTasks.jsx";
import { getTaskStatuses } from "../components/queries/getTaskStatuses.jsx";

function HomePage() {
  const { data: projectsResponse, isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
  const projects = projectsResponse?.data || [];

  const { data: taskLabelsResponse, isLoading: labelsLoading } = useQuery({
    queryKey: ["taskLabels"],
    queryFn: getTaskLabels,
  });
  const taskLabels = taskLabelsResponse?.data || [];

  const { data: tasksResponse, isLoading: tasksLoading } = useQuery({
    queryKey: ["allTasks"],
    queryFn: getAllTasks,
  });
  const tasks = tasksResponse?.data || [];

  const { data: statusResponse, isLoading: statusLoading } = useQuery({
    queryKey: ["taskStatuses"],
    queryFn: getTaskStatuses,
  });
  const taskStatuses = statusResponse?.data || [];

  const [selectedProjectId, setSelectedProjectId] = useState("");

  useEffect(() => {
    if (projects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  const filteredTasks = tasks.filter(
    (task) => String(task.project?.id) === String(selectedProjectId)
  );

  const tasksByStatus = filteredTasks.reduce((acc, task) => {
    const status = task.task_status?.title;

    if (!acc[status]) {
      acc[status] = [];
    }

    acc[status].push(task);
    return acc;
  }, {});

  return (
    <div className="main-layout">
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
                className={
                  selectedProjectId === project.id ? "selected-project" : ""
                }
                style={{ cursor: "pointer" }}
              >
                {project.title}
              </li>
            ))}
          </ul>
        )}
      </aside>
      <section className="main-content">
        <div className="filter-bar">
          <form className="filters">
            <div className="filter-bar__task-label select">
              <select
                className="select-dropdown"
                name="task-select"
                id="task-select"
              >
                <option value="all">All tasks</option>
                {labelsLoading ? (
                  <option disabled>Loading...</option>
                ) : (
                  taskLabels.map((label) => (
                    <option key={label.id} value={label.title}>
                      {label.title}
                    </option>
                  ))
                )}
              </select>
            </div>
            <input
              className="input"
              type="text"
              placeholder="Search by description..."
            />
          </form>
          <div className="active-project">
            <div className="active-project__title">
              <span className="active-project__label">Active Project: </span>
              <span className="active-project__name">
                {projects.find((p) => p.id === selectedProjectId)?.title || ""}
              </span>
            </div>
            <button className="button is-primary is-outlined">
              Add new task
            </button>
          </div>
          <div className="backlogpage">
            <Link to="/backlog" className="backlogpage__link button is-link">
              Backlog
            </Link>
          </div>
        </div>

        <div className="task-list">
          {tasksLoading || statusLoading ? (
            <div>Loading tasks...</div>
          ) : (
            <div className="task-columns">
              {taskStatuses.map((status) => {
                const statusTitle = status.title || status?.title;

                if (statusTitle === "Backlog") return null;

                const tasksForStatus = tasksByStatus[statusTitle] || [];

                return (
                  <div key={statusTitle} className="task-column">
                    <h3>{statusTitle}</h3>
                    <ul>
                      {tasksForStatus.length > 0 ? (
                        tasksForStatus.map((task) => (
                          <li className="task" key={task.id}>
                            <span className="task__title">{task.title}</span>
                            <span className="task__description">
                              {task.description}
                            </span>
                            <span className="task-labels">
                              {task.task_labels.map((label) => (
                                <span key={label.id} className="task-label">
                                  {label.title}
                                </span>
                              ))}
                            </span>
                          </li>
                        ))
                      ) : (
                        <li style={{ color: "#fff" }}>No tasks added yet.</li>
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
