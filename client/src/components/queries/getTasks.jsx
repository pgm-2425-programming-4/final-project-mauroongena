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
      Authorization: `Bearer 3b16462ac859b9600de06b6d717a276d3bb7eae0046bd6e821ffad3f39f4ab0137961eacbb561ba992850b22a90b6f495d4735a8dbd56f35da9cbfd3ab18ea88b0c06ec0b8ea75ef8acf957fd9135c225aec5ee974ce3692614aeb01d8ea64431e2b1b559e492c2e9a93a76dd9cf1c86c4c8b86bb9523242d11dfb580b1bbdd0`,
    },
  });

  if (!result.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await result.json();
  return data;
}
