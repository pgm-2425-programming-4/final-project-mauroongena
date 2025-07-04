import { API_URL, API_TOKEN } from "../constants/constants.js";

export async function postTask(task) {
  const url = `${API_URL}/tasks`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ data: task }),
  });

  if (!response.ok) {
    throw new Error("Fout bij toevoegen van taak");
  }

  return response.json();
}
