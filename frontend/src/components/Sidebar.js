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
    if (!name.trim()) {
      alert("Please enter a board name.");
      return;
    }

    console.log("Creating board:", name); 

    try {
      const res = await axios.post("/boards", { name: name.trim() }); 
      console.log("Board created:", res.data); 
      setBoards([...boards, res.data]); 
      setName(""); 
    } catch (err) {
      console.error("Error creating board", err.response?.data || err.message);
    }
  };

  return (
    <div style={{ borderRight: "1px solid #ccc", padding: "1rem", width: "250px" }}>
      <h2>Boards</h2>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {boards.map((board) => (
          <li
            key={board._id}
            onClick={() => {
              console.log("Clicked board ID:", board._id); 
              onSelectBoard(board._id);
            }}
            style={{
              cursor: "pointer",
              marginBottom: "0.5rem",
              color: "#007bff",
              textDecoration: "underline",
            }}
          >
            {board.name}
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="New board name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", marginBottom: "0.5rem" }}
      />
      <button onClick={addBoard} style={{ width: "100%" }}>
        Add Board
      </button>
    </div>
  );
}
