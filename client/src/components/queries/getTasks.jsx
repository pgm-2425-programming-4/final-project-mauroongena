import  { API_TOKEN, API_URL } from "../../constants/constants.js"

export async function getTasks({ page = 1, pageSize = 20, project } = {}) {
  const base = `${API_URL}/tasks?populate=*`;

  const filters = [
    `filters[task_status][title][$eq]=Backlog`,
    `filters[project][title][$eq]=${encodeURIComponent(project)}`,
    `pagination[page]=${page}`,
    `pagination[pageSize]=${pageSize}`,
  ];

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
