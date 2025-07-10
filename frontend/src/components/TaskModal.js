import React, { useState } from "react";
import axios from "../axiosConfig";

export default function TaskModal({ boardId, onTaskCreated }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "To Do",
        priority: "Medium",
        assignedTo: "",
        dueDate: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post(`/boards/${ boardId } / tasks, form`);
            onTaskCreated(res.data);
            setForm({
                title: "",
                description: "",
                status: "To Do",
                priority: "Medium",
                assignedTo: "",
                dueDate: "",
            });
        } catch (err) {
            console.error("Task create failed", err);
        }
    };

    return (
        <div style={{ marginTop: "2rem" }}>
            <h3>Add New Task</h3>
            <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Task title"
                required
            />
            <br />
            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
            />
            <br />
            <select name="status" value={form.status} onChange={handleChange}>
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
            </select>
            <select name="priority" value={form.priority} onChange={handleChange}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>
            <br />
            <input
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
                placeholder="Assign to"
            />
            <input
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={handleChange}
            />
            <br />
            <button onClick={handleSubmit}>Create Task</button>
        </div>
    );
}