import { Link } from "@tanstack/react-router";

function FilterBar({
  taskLabels,
  labelsLoading,
  projects,
  selectedProjectId,
  selectedLabel,
  setSelectedLabel,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className="filter-bar">
      <form className="filters">
        <div className="filter-bar__task-label select">
          <select
            className="select-dropdown"
            name="task-select"
            id="task-select"
            value={selectedLabel}
            onChange={(e) => setSelectedLabel(e.target.value)}
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <div className="active-project">
        <div className="active-project__title">
          <span className="active-project__label">Active Project: </span>
          <span className="active-project__name">
            {projects.find((p) => p.id === selectedProjectId)?.title || ""}
          </span>
        </div>
        <button className="button is-primary is-outlined">Add new task</button>
      </div>
      <div className="backlogpage">
        <Link to="/backlog" className="backlogpage__link button is-link">
          Backlog
        </Link>
      </div>
    </div>
  );
}

export default FilterBar;
