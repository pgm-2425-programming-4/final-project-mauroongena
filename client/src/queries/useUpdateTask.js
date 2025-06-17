import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "./update-task.js";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ documentId, data }) => updateTask(documentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
}
