import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="navbar">
        <Link to="/">
          Home
        </Link>
        <Link to="/backlog">
          Backlog
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
})