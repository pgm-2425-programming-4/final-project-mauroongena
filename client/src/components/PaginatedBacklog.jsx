import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getTasks } from "./queries/getTasks";
import { Backlog } from "./Backlog";
import { Pagination } from "./Pagination";

export function PaginatedBacklog({ project }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const projectTitle = project?.title;

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["tasks", page, pageSize, projectTitle],
    queryFn: () => getTasks({ page, pageSize, project: projectTitle }),
    keepPreviousData: true,
  });

  if (isPending) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;

  const tasks = data.data;
  const meta = data.meta.pagination;

  if (!tasks || tasks.length === 0) {
    return null;
  }

  return (
    <div className="paginated-backlog">
      <h2>{projectTitle || "Alle projecten"}</h2>
      <Backlog tasks={tasks} />
      <Pagination
        currentPage={meta.page}
        totalPages={meta.pageCount}
        onPageChange={(page) => setPage(page)}
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
    </div>
  );
}
