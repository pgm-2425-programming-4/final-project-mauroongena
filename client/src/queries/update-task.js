import { API_URL, API_TOKEN } from "../constants/constants.js";
import { getTaskByDocumentId } from "./get-task-by-documentId";

export async function updateTask(documentId, data) {
  const task = await getTaskByDocumentId(documentId);

  if (!task) {
    console.error("❌ Task not found for documentId:", documentId);
    throw new Error("Task not found");
  }

  const strapiId = task.id;
  console.log("🛠 Updating Strapi Task ID:", strapiId, "with data:", data);

  const url = `${API_URL}/tasks/${documentId}`;

  const result = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });

  if (!result.ok) {
    const errorText = await result.text();
    console.error("❌ Failed to update task:", errorText);
    throw new Error("Failed to update task");
  }

  return await result.json();
}
