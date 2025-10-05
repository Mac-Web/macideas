function Task({ task, tasks, setTasks, id }) {
  function handleDelete() {
    setTasks({ ...tasks, tasks: tasks.tasks.filter((task) => task.id !== id) });
  }

  return (
    <div className="tasks-item">
      {task}
      <span className="del" onClick={handleDelete}>
        del
      </span>
    </div>
  );
}

export default Task;
