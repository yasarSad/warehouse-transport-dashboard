"use client"; // required for useState

import { useState } from "react";
import { tasks as initialTasks } from "../app/data/task";

export default function Home() {
  const [filter, setFilter] = useState("ALL");
  const [taskList, setTaskList] = useState(initialTasks);

  const filteredTasks =
    filter === "ALL" ? taskList : taskList.filter((t) => t.status === filter);

  const statusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "orange";
      case "IN_PROGRESS":
        return "blue";
      case "COMPLETED":
        return "green";
      default:
        return "black";
    }
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Warehouse Transport Task Dashboard</h1>

      <p style={{ marginTop: "0.5rem", color: "#555" }}>
        🚧 Demo Mode — This application uses seeded demo data.
        No real warehouse operations are executed.
      </p>

      <section style={{ marginTop: "2rem" }}>
        <h2>Transport Tasks</h2>

        {/* Filter buttons */}
        <div style={{ marginBottom: "1rem" }}>
          {["ALL", "PENDING", "IN_PROGRESS", "COMPLETED"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              style={{
                marginRight: "0.5rem",
                padding: "0.25rem 0.5rem",
                backgroundColor: filter === status ? "#4f46e5" : "#e5e7eb",
                color: filter === status ? "#fff" : "#000",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Task list */}
        <ul>
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              style={{
                marginBottom: "0.5rem",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <strong>{task.id}</strong> — {task.transportType} — {task.source} → {task.destination} —{" "}
              <span style={{ color: statusColor(task.status), fontWeight: "bold" }}>
                {task.status}
              </span>{" "}
              — Priority: {task.priority}
            </li>
          ))}
        </ul>
      </section>

      {/* Add new task form */}
      <section style={{ marginTop: "2rem" }}>
        <h3>Add New Task</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const id = (form.id.value as string).trim();
            const source = (form.source.value as string).trim();
            const destination = (form.destination.value as string).trim();
            const transportType = (form.transportType.value as string).trim();
            const status = (form.status.value as string).trim();
            const priority = (form.priority.value as string).trim();

            if (!id || !source || !destination || !transportType || !status || !priority) return;

            setTaskList([
              ...taskList,
              { id, source, destination, transportType, status, priority },
            ]);

            form.reset();
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <input name="id" placeholder="Task ID (e.g., TASK-005)" />
          <input name="source" placeholder="Source (e.g., Dock A)" />
          <input name="destination" placeholder="Destination (e.g., Storage B)" />
          <input name="transportType" placeholder="Transport Type (Conveyor/AGV/Forklift)" />
          <input name="status" placeholder="Status (PENDING/IN_PROGRESS/COMPLETED)" />
          <input name="priority" placeholder="Priority (LOW/MEDIUM/HIGH)" />
          <button
            type="submit"
            style={{ padding: "0.25rem 0.5rem", cursor: "pointer" }}
          >
            Add Task
          </button>
        </form>
      </section>
    </main>
  );
}
