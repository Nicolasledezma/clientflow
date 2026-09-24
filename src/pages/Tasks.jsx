import { useEffect, useState } from "react";
import {
  Plus,
  CheckCircle2,
  Clock3,
  Circle,
  Pencil,
  Trash2,
} from "lucide-react";

import { tasks as initialTasks } from "../data/tasks";

const taskStatuses = [
  "Todo",
  "In Progress",
  "Completed",
];

const taskPriorities = [
  "High",
  "Medium",
  "Low",
];

function Tasks() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(
      "clientflow_tasks"
    );

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return initialTasks;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Todo",
    dueDate: "",
    client: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "clientflow_tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setEditingTask(null);

    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      status: "Todo",
      dueDate: "",
      client: "",
    });

    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);

    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
      client: task.client,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);

    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      status: "Todo",
      dueDate: "",
      client: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingTask) {
      setTasks((previous) =>
        previous.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                ...formData,
              }
            : task
        )
      );
    } else {
      setTasks((previous) => {
        const newId =
          previous.length > 0
            ? Math.max(
                ...previous.map((task) => task.id)
              ) + 1
            : 1;

        const newTask = {
          id: newId,
          ...formData,
        };

        return [...previous, newTask];
      });
    }

    closeModal();
  };

  const handleDelete = (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    setTasks((previous) =>
      previous.filter((task) => task.id !== taskId)
    );
  };

  const changeStatus = (taskId, status) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status,
            }
          : task
      )
    );
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const todoTasks = tasks.filter(
    (task) => task.status === "Todo"
  ).length;

  const getPriorityClass = (priority) => {
    return priority.toLowerCase();
  };

  const getStatusIcon = (status) => {
    if (status === "Completed") {
      return <CheckCircle2 size={18} />;
    }

    if (status === "In Progress") {
      return <Clock3 size={18} />;
    }

    return <Circle size={18} />;
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Tasks</h1>

          <p>
            Manage your tasks and stay on top of your work.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={openAddModal}
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>

      {/* Task Summary */}
      <div className="tasks-summary">
        <div className="task-summary-card">
          <div className="task-summary-icon">
            <Circle size={18} />
          </div>

          <div>
            <span>Total Tasks</span>
            <strong>{totalTasks}</strong>
          </div>
        </div>

        <div className="task-summary-card">
          <div className="task-summary-icon">
            <Clock3 size={18} />
          </div>

          <div>
            <span>In Progress</span>
            <strong>{inProgressTasks}</strong>
          </div>
        </div>

        <div className="task-summary-card">
          <div className="task-summary-icon">
            <CheckCircle2 size={18} />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>
        </div>

        <div className="task-summary-card">
          <div className="task-summary-number">
            {todoTasks}
          </div>

          <div>
            <span>To Do</span>
            <strong>{todoTasks}</strong>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="tasks-card">
        <div className="tasks-card-header">
          <div>
            <h2>All Tasks</h2>
            <p>
              Keep track of your current work.
            </p>
          </div>
        </div>

        <div className="tasks-list">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`task-item ${
                task.status === "Completed"
                  ? "task-completed"
                  : ""
              }`}
            >
              <div className="task-status-icon">
                {getStatusIcon(task.status)}
              </div>

              <div className="task-main">
                <div className="task-title-row">
                  <h3>{task.title}</h3>

                  <span
                    className={`priority-badge ${getPriorityClass(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </div>

                <p className="task-description">
                  {task.description}
                </p>

                <div className="task-meta">
                  <span>
                    Client:{" "}
                    <strong>{task.client}</strong>
                  </span>

                  <span>
                    Due:{" "}
                    <strong>{task.dueDate}</strong>
                  </span>
                </div>
              </div>

              <div className="task-status">
                <select
                  value={task.status}
                  onChange={(event) =>
                    changeStatus(
                      task.id,
                      event.target.value
                    )
                  }
                >
                  {taskStatuses.map((status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="task-actions">
                <button
                  className="task-action"
                  onClick={() => openEditModal(task)}
                  title="Edit task"
                >
                  <Pencil size={16} />
                </button>

                <button
                  className="task-action task-delete"
                  onClick={() =>
                    handleDelete(task.id)
                  }
                  title="Delete task"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="tasks-empty">
              <CheckCircle2 size={30} />

              <h3>No tasks yet</h3>

              <p>
                Create your first task to get started.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Task Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="client-modal task-modal">
            <div className="modal-header">
              <div>
                <h2>
                  {editingTask
                    ? "Edit Task"
                    : "Add New Task"}
                </h2>

                <p>
                  {editingTask
                    ? "Update the task information."
                    : "Create a new task."}
                </p>
              </div>

              <button
                className="modal-close"
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            <form
              className="client-form"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label>Task Title</label>

                <input
                  type="text"
                  name="title"
                  placeholder="Enter task title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>

                <textarea
                  name="description"
                  placeholder="Describe the task..."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Client</label>

                <input
                  type="text"
                  name="client"
                  placeholder="Enter client name"
                  value={formData.client}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>

                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                  >
                    {taskPriorities.map(
                      (priority) => (
                        <option
                          key={priority}
                          value={priority}
                        >
                          {priority}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    {taskStatuses.map(
                      (status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Due Date</label>

                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  {editingTask
                    ? "Save Changes"
                    : "Add Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;