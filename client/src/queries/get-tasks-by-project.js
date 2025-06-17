import { API_URL, API_TOKEN } from "../constants/constants.js";

export async function getTasksByProject(projectId, selectedLabel = "all") {
  let url = `${API_URL}/tasks?populate=*`;

  url += `&filters[project][documentId][$eq]=${projectId}`;
  url += `&filters[task_status][title][$ne]=Backlog`;

  if (selectedLabel && selectedLabel !== "all") {
    url += `&filters[task_labels][title][$eq]=${encodeURIComponent(selectedLabel)}`;
  }

  const result = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!result.ok) throw new Error("Failed to fetch tasks for project");

  return await result.json();
}
