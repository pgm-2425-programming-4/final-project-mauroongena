import { API_URL, API_TOKEN } from "../constants/constants.js";

export async function getTaskByDocumentId(documentId) {
  const url = `${API_URL}/tasks?filters[documentId][$eq]=${documentId}`;

  const result = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!result.ok) throw new Error("Failed to fetch task by documentId");

  const json = await result.json();
  return json.data[0]; 
}
