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
  onAddTask,
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
            style={{backgroundColor: "#374357"}}
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
          style={{backgroundColor: "#374357"}}
        />
      </form>
      <div className="active-project">
        <div className="active-project__title">
          <span className="active-project__label">Active Project: </span>
          <span className="active-project__name">
            {projects.find((p) => p.id === selectedProjectId)?.title || ""}
          </span>
        </div>
        <button
          className="button is-primary is-outlined"
          type="button"
          onClick={() => {
            console.log("Knop geklikt");
            onAddTask();
          }}
        >
          Add new task
        </button>
        <div className="backlogpage">
        <Link
          to='/projects/$projectId/backlog'
          params={{ documentId: selectedProjectId }}
          className="backlogpage__link button is-link"
          onClick={console.log("selectedProjectId in FilterBar:", selectedProjectId)}
        >
          Backlog
        </Link>
      </div>
      </div>

    </div>
  );
}

export default FilterBar;
