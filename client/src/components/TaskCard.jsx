import { PenSquareIcon, Trash2Icon, CheckCircle, Circle } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import e from "cors";
import api from "../lib/axios";
import toast from "react-hot-toast";

const TaskCard = ({ task, setTasks }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete the task")) return;

    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success("task deleted successfully");
    } catch (error) {
      console.log("Error in deleting", error);
      console.log("failed to delete the task");
    }
  };

  const handleToggle = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch(`/tasks/${task._id}/toggle`);
      setTasks((prev) => prev.map((t) => (t._id === task._id ? res.data : t)));
    } catch (error) {
      toast.error("Failed to update task status");
    }
  };

  return (
    <Link
      to={`/task/${task._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4
    border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{task.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{task.description}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(task.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <button
              className="btn btn-ghost btn-xs"
              onClick={handleToggle}
              title={task.completed ? "Mark as undone" : "Mark as done"}
            >
              {task.completed ? (
                <CheckCircle className="size-4 text-success" />
              ) : (
                <Circle className="size-4" />
              )}
            </button>
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, task._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
