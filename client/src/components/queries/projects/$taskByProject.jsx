import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProjects } from "../../queries/getProjects";

export const Route = createFileRoute("/projects/$taskByProject")({
  loader: async ({ params }) => {
    const { taskById } = params;

    if (!taskById || taskById.length !== 1) {
      return notFound("INVALID_ROUTE");
    }

    try {
      const data = await getProjects(taskById);
      return data;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return notFound("NO_RECIPES_FOUND");
    }
  },

  component: RouteComponent,
  notFoundComponent: ({ data }) => {
    if (data.data === "INVALID_ROUTE") {
      return <div>Invalid route</div>;
    }
    return <div>No recipes found</div>;
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <div>
      {data.map((project) => (
        <li key={project.id}>
          <Link
            to="/recipes/recipe/$recipeId"
            params={{ projectId: project.id }}
          >
            {project.title}
          </Link>
        </li>
      ))}
    </div>
  );
}
