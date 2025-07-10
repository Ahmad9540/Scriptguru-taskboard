import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import BoardPage from "./components/BoardPage";

function App() {
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onSelectBoard={setSelectedBoardId} />
      <div style={{ flex: 1 }}>
        {selectedBoardId ? (
          <BoardPage boardId={selectedBoardId} />
        ) : (
          <p style={{ padding: "1rem" }}>Select a board to view tasks.</p>
        )}
      </div>
    </div>
  );
}

export default App;