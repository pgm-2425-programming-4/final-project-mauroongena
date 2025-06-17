import { API_URL, API_TOKEN } from "../constants/constants.js";

export async function getAllTasks() {
  const url = `${API_URL}/tasks?populate=*&filters[task_status][title][$ne]=Backlog`;
  const result = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  if (!result.ok) throw new Error("Failed to fetch tasks");
  return await result.json();
}
