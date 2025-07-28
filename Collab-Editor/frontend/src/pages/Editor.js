import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import Toolbar from "../components/Toolbar";
import PresenceIndicator from "../components/PresenceIndicator";

const socket = io("http://localhost:5000");

export default function Editor() {
  const [content, setContent] = useState("");
  const [docId, setDocId] = useState("doc1");
  const [users, setUsers] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    socket.emit("join", { docId, user: localStorage.getItem("token") });
    socket.on("update", (text) => setContent(text));
    socket.on("presence", (user) => setUsers((prev) => [...new Set([...prev, user])]));
    socket.on("leave", (user) => setUsers((prev) => prev.filter(u => u !== user)));
  }, [docId]);

  useEffect(() => {
    const saveInterval = setInterval(() => {
      axios.put(`/api/documents/${docId}`, { content });
    }, 5000);
    return () => clearInterval(saveInterval);
  }, [content]);

  const handleChange = (e) => {
    setContent(e.target.value);
    socket.emit("edit", { content: e.target.value });
  };

  const format = (cmd) => {
    document.execCommand(cmd, false, null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 text-gray-900 dark:text-white">
      <PresenceIndicator users={users} />
      <Toolbar format={format} />
      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleChange}
        className="w-full h-[70vh] p-4 mt-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded shadow-lg"
      />
    </div>
  );
}
