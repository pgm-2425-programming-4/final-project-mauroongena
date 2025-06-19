import { API_URL, API_TOKEN } from "../constants/constants.js";

export async function getProjectById(projectId) {
  const url = `${API_URL}/projects/${projectId}`;
  const result = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!result.ok) {
    throw new Error("Failed to fetch project");
  }

  const data = await result.json();
  return data;
}
