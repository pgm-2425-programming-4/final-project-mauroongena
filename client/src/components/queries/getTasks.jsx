export async function getTasks({ page = 1, pageSize = 20, project } = {}) {
  const base = `http://localhost:1337/api/tasks?populate=*`;

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
      Authorization: `Bearer 21643d97964d683523279d2e2b385098a4e3fab8e6f9c85cfe620f565c71d6c5eb9b500aa0557980b6c94ce6cc7ed14d0fd202e60103c273875a5e2f6da235d6d8f03f88bc4637c9d36c6915de0dba7fc42ac21a45122da72e5e37a1d9dd380a6110f4f12874cee2666ae8ee92f306e813fc279cbecf2ed91421299e666424b7`,
    },
  });

  if (!result.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await result.json();
  return data;
}
