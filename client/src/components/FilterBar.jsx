import { Link } from "@tanstack/react-router";

function FilterBar({
  taskLabels,
  labelsLoading,
  selectedProjectId,
  selectedLabel,
  setSelectedLabel,
  searchTerm,
  setSearchTerm,
  onAddTask,
}) {
  return (
    <div className="filter-bar">
      <form className="filters" onSubmit={(e) => e.preventDefault()}>
        <div className="filter-bar__task-label select">
          <select
            className="select-dropdown"
            value={selectedLabel}
            onChange={(e) => setSelectedLabel(e.target.value)}
            style={{ backgroundColor: "#374357" }}
          >
            <option value="all">All labels</option>
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
          style={{ backgroundColor: "#374357" }}
        />
      </form>

      <div className="active-project">
        <button
          className="button is-primary is-outlined"
          onClick={onAddTask}
        >
          Add new task
        </button>

        <div className="backlogpage">
          <Link
            to="/projects/$projectId/backlog"
            params={{ projectId: selectedProjectId }}
            className="backlogpage__link button is-link"
          >
            Backlog
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
