import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { getProjects } from "../queries/get-projects";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  loader: async () => {
    const res = await getProjects();
    const projects = res.data;
    return projects;
  },
  component: RootLayout,
});

function RootLayout() {
  const projects = Route.useLoaderData();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "250px 1fr",
        height: "100vh",
      }}
    >
      <nav
        style={{
          padding: "1rem",
          borderRight: "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          overflowY: "auto",
          backgroundColor: "#0F1C2E"
        }}
      >
        <div className="li">
          <Link
            to="/"
            className="sidebar-link"
            activeProps={{ className: "sidebar-link active" }}
          >
            Home
          </Link>
        </div>

        <div>
          <h2>Projecten</h2>
          <ul>
            {projects.map((project) => (
              <li className="li" key={project.documentId}>
                <Link
                  to={`/projects/${project.documentId}`}
                  className="sidebar-link"
                  activeProps={{ className: "sidebar-link active" }}
                >
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Info</h2>
          <div className="li">
            <Link to="/about" className="sidebar-link"
            activeProps={{ className: "sidebar-link active" }}>
            About
          </Link>
          </div>

        </div>
      </nav>

      <main style={{padding: "1rem", backgroundColor: "#0F1C2E"}}>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  );
}
