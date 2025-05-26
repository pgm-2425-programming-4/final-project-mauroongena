import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import App from "../App";
import HomePage from "../pages/HomePage";
import BacklogPage from "../pages/BacklogPage";

const rootRoute = createRootRoute({
  component: App,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const backlogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/backlog",
  component: BacklogPage,
});

const routeTree = rootRoute.addChildren([homeRoute, backlogRoute]);

export const router = createRouter({ routeTree });