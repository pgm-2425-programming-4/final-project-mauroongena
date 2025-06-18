import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getBacklogByProject } from "../queries/get-backlog-by-project.js";
import { Backlog } from "./Backlog";
import { Pagination } from "./Pagination";

export function PaginatedBacklog({ project }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const projectId = project.id;

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["backlog", page, pageSize, projectId],
    queryFn: () => getBacklogByProject(projectId, page, pageSize),
  });

  if (!projectId) return <span>Project niet gevonden...</span>;
  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;

  const tasks = data.data || [];
  const meta = data.meta.pagination || {};

  if (tasks.length === 0) {
    return <p>Geen taken gevonden voor dit project</p>;
  }

  const isLastPage = tasks.length < pageSize || meta.page === meta.pageCount;

  return (
    <div className="paginated-backlog">
      <h2>{project.title}</h2>
      <Backlog tasks={tasks} />
      <Pagination
        currentPage={meta.page || 1}
        totalPages={meta.pageCount || 1}
        onPageChange={(page) => setPage(page)}
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
        isLastPage={isLastPage}
      />
    </div>
  );
}
