import { API_URL, API_TOKEN } from "../constants/constants.js";

export async function deleteTask(taskId) {
  const url = `${API_URL}/tasks/${taskId}`;

  const result = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!result.ok) {
    throw new Error("Failed to delete task");
  }

  return await result.json();
}
