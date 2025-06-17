import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { getTaskStatuses } from "../../../queries/get-task-statuses";
import { getTasksByProject } from "../../../queries/get-tasks-by-project";
import AddTask from "../../../components/AddTask";
import { postTask } from "../../../queries/post-task";
import TaskColumns from "../../../components/TaskColumns";
import FilterBar from "../../../components/FilterBar";

export const Route = createFileRoute("/projects/$projectId/")({
  loader: async ({ params }) => {
    const projectId = params.projectId;
    const statusesData = await getTaskStatuses();
    const tasksData = await getTasksByProject(projectId);
    return {
      taskStatuses: statusesData.data,
      tasks: tasksData.data,
      projectId,
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { taskStatuses, tasks, projectId } = Route.useLoaderData();

  const [selectedLabel, setSelectedLabel] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  const projects = [];
  tasks.forEach((task) => {
    if (
      task.project &&
      !projects.find((p) => p.id === task.project.id)
    ) {
      projects.push({
        id: task.project.id,
        title: task.project.title,
      });
    }
  });

  if (projects.length === 0) {
    projects.push({
      id: projectId,
      title: `Project ${projectId}`,
    });
  }

  const selectedProject = projects.find((p) => String(p.id) === String(projectId)) || projects[0];

  const filteredTasks = tasks.filter((task) => {
    const matchesLabel =
      selectedLabel === "all" ||
      task.task_labels.some((label) => label.title === selectedLabel);

    const matchesSearch =
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesLabel && matchesSearch;
  });

  const tasksByStatus = {};
  for (const task of filteredTasks) {
    const statusTitle = task.task_status?.title || "Unknown";
    if (!tasksByStatus[statusTitle]) {
      tasksByStatus[statusTitle] = [];
    }
    tasksByStatus[statusTitle].push(task);
  }

  const allLabels = [];
  tasks.forEach((task) => {
    task.task_labels.forEach((label) => {
      if (!allLabels.find((lab) => lab.id === label.id)) {
        allLabels.push(label);
      }
    });
  });

  const labelsLoading = false;

  function handleAddTask() {
    setShowAddTask(true);
  }

  async function handleTaskAdd(newTask) {
    try {
      await postTask(newTask);
      setShowAddTask(false);
      window.location.reload();
    } catch (error) {
      alert("Failed to add task: " + error.message);
    }
  }

  function handleCloseAddTask() {
    setShowAddTask(false);
  }

  return (
    <div>
      <FilterBar
        taskLabels={allLabels}
        labelsLoading={labelsLoading}
        projects={projects}
        selectedProjectId={selectedProject.id}
        selectedLabel={selectedLabel}
        setSelectedLabel={setSelectedLabel}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddTask={handleAddTask}
      />
      <TaskColumns 
      taskStatuses={taskStatuses}
      taskLabels={allLabels}
      tasksByStatus={tasksByStatus} 
      projectId={projectId} />
      <AddTask
        isOpen={showAddTask}
        onClose={handleCloseAddTask}
        onAdd={handleTaskAdd}
        projects={projects}
        selectedProjectId={selectedProject.id}
        taskStatuses={taskStatuses}
        taskLabels={allLabels}
      />
    </div>
  );
}

export default ProjectPage;
