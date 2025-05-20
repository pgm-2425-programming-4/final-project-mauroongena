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
      Authorization: `Bearer c4c2e11e664defb6cbafbe1fa8869b6084241d377d3228ffef7762693cc220ff380f646903e7a3899033237013e55966d263431b7ed2958e86289d8916d571a13fc58af2bdd5fb3519f6593b6ed8ad06ff53e7d3b30290b38d7b9523675a12f74525ff164dd0bc7e096563f827c3f49f41639ad25efc593cf6ed12786d43451a`,
    },
  });

  if (!result.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await result.json();
  return data;
}
