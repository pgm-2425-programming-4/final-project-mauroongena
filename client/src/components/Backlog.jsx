export function Backlog({ tasks }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Project</th>
          <th>Labels</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.project.title}</td>
            <td>{task.task_labels.map((label) => label.title).join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
