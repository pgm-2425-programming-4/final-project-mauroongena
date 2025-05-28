import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../components/queries/getProjects.jsx";
import { getTaskLabels } from "../components/queries/getTaskLabels.jsx";
import { getAllTasks } from "../components/queries/getAllTasks.jsx";

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

  console.log("Tasks:", tasks);
  const tasksByStatus = tasks.reduce((acc, task) => {
    const status =
      task.task_status?.title ||
      task.task_status ||
      "Onbekend";
    if (!acc[status]) acc[status] = [];
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
              <li key={project.id}>{project.title}</li>
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
              <span className="active-project__name">Project Name</span>
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
          {tasksLoading ? (
            <div>Loading tasks...</div>
          ) : (
            <div className="task-columns">
              {Object.entries(tasksByStatus).map(([status, tasks]) => (
                <div key={status} className="task-column">
                  <h3>{status}</h3>
                  <ul>
                    {tasks.map((task) => (
                      <li key={task.id}>{task.title}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
