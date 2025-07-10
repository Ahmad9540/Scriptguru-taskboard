import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";

export default function Sidebar({ onSelectBoard }) {
  const [boards, setBoards] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const res = await axios.get("/boards");
      setBoards(res.data);
    } catch (err) {
      console.error("Failed to fetch boards", err);
    }
  };

  const addBoard = async () => {
    if (!name) return;
    try {
      const res = await axios.post("/boards", { name });
      setBoards([...boards, res.data]);
      setName("");
    } catch (err) {
      console.error("Error creating board", err);
    }
  };

  return (
    <div style={{ borderRight: "1px solid #ccc", padding: "1rem", width: "250px" }}>
      <h2>Boards</h2>
      <ul>
        {boards.map((board) => (
          <li key={board._id} onClick={() => onSelectBoard(board._id)} style={{ cursor: "pointer" }}>
            {board.name}
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="New board name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addBoard}>Add Board</button>
    </div>
  );
}