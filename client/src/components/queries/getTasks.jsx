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
      Authorization: `Bearer a322703cff059649d6cee53f77ec2bd605fa86460f1e9272ff0db36c61789e59e8d0364fe88fa07099890c9c7308aa512abc48ac436f1bf14d657970e283b3883e9c8740694d5bd2dd72116a894ebbf59fb355a133961d5d9f3d81bd3f4f1a8872555ac2adc361dad1eb60cf2a4c6139796eca1ef330d4fe29e92ab1a75617cc`,
    },
  });

  if (!result.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await result.json();
  return data;
}
