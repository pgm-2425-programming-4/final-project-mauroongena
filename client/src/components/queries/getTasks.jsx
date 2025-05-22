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
      Authorization: `Bearer 7a8106939caf39bf75855e168ae602686ebeabf89bf79405398ccd032dae01ffda6f21ff8a82d6c574e454cb1fee69db0bfed46557dba1241791af2d4bbe25d0af59060ff57f35f51e2553518f4640900348dd12abf6d6c3ce676ff937f73417b7d52a2f153b4997799bb3d2bad18d12c4d91540f904d88068ed1f58f79cdb66`,
    },
  });

  if (!result.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await result.json();
  return data;
}
