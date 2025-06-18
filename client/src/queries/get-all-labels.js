import { API_URL, API_TOKEN } from "../constants/constants.js";

export async function getAllTaskLabels() {
  const url = `${API_URL}/task-labels`;
  const result = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!result.ok) throw new Error("Failed to fetch task labels");

  const json = await result.json();
  return json.data ?? [];
}
