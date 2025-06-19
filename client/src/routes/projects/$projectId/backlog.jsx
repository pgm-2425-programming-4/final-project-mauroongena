import { createFileRoute } from "@tanstack/react-router";
import { getProjectById } from "../../../queries/get-project-by-id";
import { PaginatedBacklog } from "../../../components/PaginatedBacklog";

export const Route = createFileRoute("/projects/$projectId/backlog")({
  loader: async ({ params }) => {
    const projectId = params.projectId;
    const projectData = await getProjectById(projectId);

    const projectObj = projectData.data;
    if (!projectObj || !projectObj.id) {
      throw new Error("Project not found");
    }
    return {
      project: projectObj,
    };
  },
  component: BacklogPage,
  notFoundComponent: () => <div>Project not found</div>,
});

function BacklogPage() {
  const { project } = Route.useLoaderData();

  if (!project?.id) {
    return <p>Project not found...</p>;
  }

  return (
    <div>
      <h1>Backlog for project: {project.title}</h1>
      <PaginatedBacklog project={project} />
    </div>
  );
}
