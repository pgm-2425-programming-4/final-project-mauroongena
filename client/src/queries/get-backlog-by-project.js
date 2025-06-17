import { API_URL, API_TOKEN } from "../constants/constants.js";

export async function getBacklogByProject(projectId, page = 1, pageSize = 10) {
  console.log("Fetching backlog for projectId:", projectId);

  const url = `${API_URL}/tasks?populate=*&filters[task_status][title][$eq]=Backlog&filters[project][id][$eq]=${projectId}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  const result = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const data = await result.json();
  console.log("Backlog response:", data);
  return data;
}
