import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getTasks } from "./queries/getTasks";
import { Backlog } from "./Backlog";
import { Pagination } from "./Pagination";

export function PaginatedBacklog() {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["tasks", page],
    queryFn: () => getTasks({ page, pageSize }),
    keepPreviousData: true,
  });

  if (isPending) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;

  const tasks = data.data;
  const meta = data.meta.pagination;

  return (
    <div>
      <Backlog tasks={tasks} />
      <Pagination
        currentPage={meta.page}
        totalPages={meta.pageCount}
        onPageChange={setPage}
      />
    </div>
  );
}
