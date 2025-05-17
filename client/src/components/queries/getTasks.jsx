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
      Authorization: `Bearer 03a25649aa02c939b2a44488c23b21a2ae47c98fb3e053b67f6156d4e29b6e729341383159bfca12360bb2a3d7da7334e84c01cc7cad1cb3e8a8436283692a02787b3e4b9d0432727c9c08a144c08f008cb0697e9ea6c61e993cdf067bab1df139143b997ead9dcc680df9cfa5699f1f5a3e324a7e466125b58fbb68b6130224`,
    },
  });

  if (!result.ok) {
    throw new Error("Failed to fetch tasks");
  } 

  const data = await result.json();
  return data;
}
