import { API_URL, API_TOKEN } from "../constants/constants.js";

export async function getTasksByProject(projectId) {
  const url = `${API_URL}/tasks?populate=*&filters[task_status][title][$ne]=Backlog&filters[project][documentId][$eq]=${projectId}`;
  
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
