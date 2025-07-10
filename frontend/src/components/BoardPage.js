import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import TaskModal from "./TaskModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function BoardPage({ boardId }) {
  const [tasks, setTasks] = useState([]);
  const [isEditingId, setIsEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  useEffect(() => {
    if (boardId) {
      axios.get(`/boards/${boardId}/tasks`).then((res) => setTasks(res.data));
    }
  }, [boardId]);

  const startEdit = (task) => {
    setIsEditingId(task._id);
    setEditData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assignedTo: task.assignedTo,
      dueDate: task.dueDate?.substring(0, 10) || "",
    });
  };

  const saveEdit = async (taskId) => {
    try {
      const res = await axios.put(`/tasks/${taskId}, editData`);
      const updatedTasks = tasks.map((t) => (t._id === taskId ? res.data : t));
      setTasks(updatedTasks);
      setIsEditingId(null);
    } catch (err) {
      console.error("Error saving task", err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const taskToMove = tasks.find((t) => t._id === draggableId);
    const updatedTask = { ...taskToMove, status: destination.droppableId };

    try {
      await axios.put(`/tasks/${draggableId}, updatedTask`);
      const res = await axios.get(`/boards/${boardId}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error("Drag update failed", err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchPriority = priorityFilter ? task.priority === priorityFilter : true;
    return matchSearch && matchPriority;
  });

  const grouped = {
    "To Do": [],
    "In Progress": [],
    "Done": [],
  };

  filteredTasks.forEach((task) => grouped[task.status]?.push(task));

  return (
    <div style={{ padding: "1rem", flex: 1 }}>
      <h2>Board Tasks</h2>

   
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          style={{ marginLeft: "1rem" }}
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: "1rem" }}>
          {Object.entries(grouped).map(([status, taskList]) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    flex: 1,
                    border: "1px solid #ccc",
                    padding: "1rem",
                    minHeight: "300px",
                  }}
                >
                  <h3>{status}</h3>
                  {taskList.map((task, index) => (
                    <Draggable draggableId={task._id} index={index} key={task._id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            background: "#f2f2f2",
                            padding: "0.5rem",
                            marginBottom: "1rem",
                            borderRadius: "5px",
                            ...provided.draggableProps.style,
                          }}
                        >
                          {isEditingId === task._id ? (
                            <>
                              <input
                                value={editData.title}
                                onChange={(e) =>
                                  setEditData({ ...editData, title: e.target.value })
                                }
                                placeholder="Title"
                              />
                              <br />
                              <textarea
                                value={editData.description}
                                onChange={(e) =>
                                  setEditData({ ...editData, description: e.target.value })
                                }
                                placeholder="Description"
                              />
                              <br />
                              <select
                                value={editData.status}
                                onChange={(e) =>
                                  setEditData({ ...editData, status: e.target.value })
                                }
                              >
                                <option>To Do</option>
                                <option>In Progress</option>
                                <option>Done</option>
                              </select>
                              <select
                                value={editData.priority}
                                onChange={(e) =>
                                  setEditData({ ...editData, priority: e.target.value })
                                }
                              >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                              </select>
                              <br />
                              <input
                                type="text"
                                value={editData.assignedTo}
                                onChange={(e) =>
                                  setEditData({ ...editData, assignedTo: e.target.value })
                                }
                                placeholder="Assigned To"
                              />
                              <input
                                type="date"
                                value={editData.dueDate}
                                onChange={(e) =>
                                  setEditData({ ...editData, dueDate: e.target.value })
                                }
                              />
                              <br />
                              <button onClick={() => saveEdit(task._id)}>Save</button>
                              <button onClick={() => setIsEditingId(null)}>Cancel</button>
                            </>
                          ) : (
                            <>
                              <h4>{task.title}</h4>
                              <p>{task.description}</p>
                              <p>
                                <b>Priority:</b> {task.priority}
                              </p>
                              <p>
                                <b>Assigned:</b> {task.assignedTo}
                              </p>
                              {task.dueDate && (
                                <p>
                                  <b>Due:</b> {task.dueDate.substring(0, 10)}
                                </p>
                              )}
                              <button onClick={() => startEdit(task)}>Edit</button>
                              <button onClick={() => deleteTask(task._id)}>Delete</button>
                            </>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <TaskModal boardId={boardId} onTaskCreated={(newTask) => setTasks([...tasks, newTask])} />
 </div>
);
}