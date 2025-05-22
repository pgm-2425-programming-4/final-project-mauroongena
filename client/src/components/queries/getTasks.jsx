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
      Authorization: `Bearer c4308c29472efd295c37df1efab35ad47050773a0d36d639c28085997c4391c4ab9c402090b54332698c61bb6b6171f3ddd0bf050775cd42b84a09275c51ac798540fff6af87b5fa7cee36524934d75fac5089971375b3ff3185a874204c8996ba70a3f287d296f1979ffd42f3705c660c0d82f38011d95b06491ac99dcf2175`,
    },
  });

  if (!result.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await result.json();
  return data;
}
