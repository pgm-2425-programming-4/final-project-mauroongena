import { useQuery } from "@tanstack/react-query";
import { getTasks } from "./components/queries/getTasks.jsx";

export function Tasks() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  if (isPending) {
    return (
      <div
        className="skeleton-block"
        style={{ minHeight: "3em", width: "100%" }}
      >
        <div className="skeleton-block" style={{ marginBottom: "1em" }}></div>
        <div className="skeleton-block" style={{ marginBottom: "1em" }}></div>
        <div className="skeleton-block"></div>
      </div>
    );
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  console.log(data);

  return (
    <ul>
      {data.map((task) => (
        <li key={task.id}>
          <h2>{task.title}</h2>
        </li>
      ))}
    </ul>
  );
}