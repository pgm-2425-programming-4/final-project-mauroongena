import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getTaskStatuses } from "../../../queries/get-task-statuses";
import { getTasksByProject } from "../../../queries/get-tasks-by-project";
import { getAllTaskLabels } from "../../../queries/get-all-labels";
import { postTask } from "../../../queries/post-task";

import AddTask from "../../../components/AddTask";
import TaskColumns from "../../../components/TaskColumns";
import FilterBar from "../../../components/FilterBar";

export const Route = createFileRoute("/projects/$projectId/")({
  component: ProjectPage,
});

function ProjectPage() {
  const { projectId } = Route.useParams();

  const [selectedLabel, setSelectedLabel] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  const queryClient = useQueryClient();

  const { data: statusData } = useQuery({
    queryKey: ["taskStatuses"],
    queryFn: getTaskStatuses,
  });

  const { data: taskData } = useQuery({
    queryKey: ["tasks", projectId, selectedLabel],
    queryFn: () => getTasksByProject(projectId, selectedLabel),
  });

  const { data: labelResponse, isLoading: labelsLoading } = useQuery({
    queryKey: ["taskLabels"],
    queryFn: getAllTaskLabels,
  });

  const taskStatuses = statusData?.data ?? [];
  const tasks = taskData?.data ?? [];

  const taskLabels = labelResponse?.map(label => ({
    id: label.id,
    title: label.title,
  })) ?? [];

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const allLabelsFromTasks = [];
  tasks.forEach((task) => {
    (task.task_labels || []).forEach((label) => {
      if (!allLabelsFromTasks.find((lab) => lab.id === label.id)) {
        allLabelsFromTasks.push(label);
      }
    });
  });

  const projects = [];
  tasks.forEach((task) => {
    const docId = task.project?.documentId;
    if (docId && !projects.find((p) => p.id === docId)) {
      projects.push({
        id: docId,
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

  function handleAddTask() {
    setShowAddTask(true);
  }

  async function handleTaskAdd(newTask) {
    try {
      await postTask(newTask);
      await queryClient.invalidateQueries(["tasks"]);
      setShowAddTask(false);
    } catch (error) {
      alert("Failed to add task: " + error.message);
    }
  }

  function handleCloseAddTask() {
    setShowAddTask(false);
  }

  const handleTaskSaved = async () => {
    await queryClient.invalidateQueries(["tasks", projectId, selectedLabel]);
  };

  return (
    <div>
      <FilterBar
        taskLabels={taskLabels}
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
        taskLabels={taskLabels}
        tasks={filteredTasks}
        projectId={projectId}
        selectedLabel={selectedLabel}
        onTaskSaved={handleTaskSaved}
      />

      <AddTask
        isOpen={showAddTask}
        onClose={handleCloseAddTask}
        onAdd={handleTaskAdd}
        projects={projects}
        selectedProjectId={selectedProject.id}
        taskStatuses={taskStatuses}
        taskLabels={taskLabels}
      />
    </div>
  );
}

export default ProjectPage;
