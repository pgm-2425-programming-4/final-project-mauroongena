import { Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getProjects } from "../components/queries/getProjects.jsx";
import { getTaskLabels } from "../components/queries/getTaskLabels.jsx";
import { getAllTasks } from "../components/queries/getAllTasks.jsx";
import { getTaskStatuses } from "../components/queries/getTaskStatuses.jsx";
import ProjectsTab from "../components/ProjectsTab";
import FilterBar from "../components/FilterBar";
import TaskColumns from "../components/TaskColumns";
import AddTask from "../components/AddTask";
import { postTask } from "../components/queries/postTask.jsx";

function HomePage() {
  const queryClient = useQueryClient();

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
  const [selectedLabel, setSelectedLabel] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    if (projects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  const filteredTasks = tasks.filter((task) => {
    const inProject = String(task.project?.id) === String(selectedProjectId);
    const hasLabel =
      selectedLabel === "all" ||
      (task.task_labels &&
        task.task_labels.find((label) => label.title === selectedLabel));
    const matchesSearch =
      searchTerm === "" ||
      (task.description &&
        task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return inProject && hasLabel && matchesSearch;
  });

  const tasksByStatus = {};
  filteredTasks.forEach((task) => {
    const status = task.task_status?.title;
    if (!tasksByStatus[status]) {
      tasksByStatus[status] = [];
    }
    tasksByStatus[status].push(task);
  });

  const handleAddTask = async (taskData) => {
    try {
      console.log("TaskData die naar backend gaat:", taskData);
      await postTask(taskData);
      await queryClient.invalidateQueries(["allTasks"]);
    } catch (error) {
      alert("Fout bij toevoegen van taak.");
      console.error(error);
    }
  };

  return (
    <div className="main-layout">
      <ProjectsTab
        projects={projects}
        projectsLoading={projectsLoading}
        selectedProjectId={selectedProjectId}
        setSelectedProjectId={setSelectedProjectId}
      />
      <section className="main-content">
        <FilterBar
          taskLabels={taskLabels}
          labelsLoading={labelsLoading}
          projects={projects}
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAddTask={() => setShowAddTask(true)}
        />
        <AddTask
          isOpen={showAddTask}
          onClose={() => setShowAddTask(false)}
          onAdd={handleAddTask}
          projects={projects}
          selectedProjectId={selectedProjectId}
          taskStatuses={taskStatuses}
          taskLabels={taskLabels}
        />
        <div className="task-list">
          {tasksLoading || statusLoading ? (
            <div>Loading tasks...</div>
          ) : (
            <TaskColumns
              taskStatuses={taskStatuses}
              tasksByStatus={tasksByStatus}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
