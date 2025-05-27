import { useQuery } from "@tanstack/react-query";
import { getProjects } from "./components/queries/getProjects.jsx";

export function Projects() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.data.map((project) => (
        <li key={project.id}>{project.title}</li>
      ))}
    </ul>
  );
}
