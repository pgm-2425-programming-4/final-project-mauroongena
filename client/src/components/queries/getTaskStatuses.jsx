import { API_URL, API_TOKEN } from "../../constants/constants.js";

export async function getTaskStatuses() {
  const url = `${API_URL}/task-statuses`;
  const result = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  if (!result.ok) throw new Error("Failed to fetch task statuses");
  return await result.json();
}