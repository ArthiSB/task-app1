import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  // Load tasks once when the page opens
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then(setTasks)
      .catch(() => setError("Could not reach the server. Is it running?"));
  }, []);

  async function addTask(e) {
    e.preventDefault();
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (res.ok) {
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setTitle("");
    }
  }

  async function toggleTask(id) {
    const res = await fetch(`${API}/${id}`, { method: "PUT" });
    const updated = await res.json();
    setTasks(tasks.map((t) => (t.id === id ? updated : t)));
  }

  async function deleteTask(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return (
    <main className="app">
      <h1>My Tasks</h1>

      <form onSubmit={addTask}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs doing?"
        />
        <button type="submit">Add task</button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? "done" : ""}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span>{task.title}</span>
            </label>
            <button className="delete" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && !error && <p>No tasks yet. Add your first one above.</p>}
    </main>
  );
}
