import { API_URL, API_TOKEN } from "../constants/constants.js";

export async function getTasks({ page = 1, pageSize = 20, project } = {}) {
  const base = `${API_URL}/tasks?populate=*`;

  const filters = [
    `filters[task_status][title][$eq]=Backlog`,
    `pagination[page]=${page}`,
    `pagination[pageSize]=${pageSize}`,
  ];
  
  if (project) {
    filters.push(`filters[project][id][$eq]=${project}`);
  }

  const urlString = `${base}&${filters.join("&")}`;
  const result = await fetch(urlString, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!result.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await result.json();
  return data;
}
